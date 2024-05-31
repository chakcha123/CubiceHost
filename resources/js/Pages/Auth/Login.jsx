import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function Login({ status, canResetPassword }) {
    const { isDarkMode } = useContext(DarkModeContext);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    const user = null;

    return (
        <AdminLayout user={user}>
            <Head title="Log in" />

            <div className='md:p-20 lg:p-30 xl:p-36'>
                <div class={`${isDarkMode ? 'border border-gray-500' : ''}  max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden mt-20`}>
                    <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
                    <p class={`${isDarkMode ? 'text-gray-100' : 'text-gray-600 '} mb-6 text-sm`}>Welcome! So good to have you back!</p>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className=" mb-2 " >email</label>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''} mt-1 block w-full`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className=" mb-2 " >password</label>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''} mt-1 block w-full`}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <button type='submit' class="block mt-6 w-full py-2 text-center text-white bg-creeper border border-creeper rounded hover:bg-transparent hover:text-creeper transition uppercase font-roboto font-medium" disabled={processing}>
                            Log in
                        </button>

                        <div class="flex gap-2 pt-5">
                            <p class={`${isDarkMode ? 'text-gray-100' : 'text-gray-600'}  text-sm`}>Don't have an account?</p><a class={`${isDarkMode ? 'text-gray-100' : 'text-gray-600 '} text-sm underline`}
                                href="/register">Register here</a>
                        </div>

                        <div className="">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className={`${isDarkMode ? 'text-gray-100 hover:text-gray-200' : 'text-gray-600 '}  underline text-sm  hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    Forgot your password?
                                </Link>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
