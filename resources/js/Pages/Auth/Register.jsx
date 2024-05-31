import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function Register() {
    const { isDarkMode } = useContext(DarkModeContext);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const user = null;


    return (
        <AdminLayout user={user}>
            <Head title="Register" />

            <div className='md:p-20 lg:p-24 xl:p-30'>
                <div class={`${isDarkMode ? 'border border-gray-500' : ''}  max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden mt-20`}>
                    <h2 class="text-2xl uppercase font-medium mb-1">Register</h2>
                    <p class={`${isDarkMode ? 'text-gray-100' : 'text-gray-600'}  mb-6 text-sm`}>Welcome! So good to have you back!</p>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className=" mb-2 " >name</label>

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className={`${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''} mt-1 block w-full`}
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className=" mb-2 " >email</label>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''} mt-1 block w-full`}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className=" mb-2 " >password confirmation</label>

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className={`${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''} mt-1 block w-full`}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                        <button type='submit' class="block mt-6 w-full py-2 text-center text-white bg-creeper border border-creeper rounded hover:bg-transparent hover:text-creeper transition uppercase font-roboto font-medium" disabled={processing}>
                            Register
                        </button>

                        <div className=" mt-4">
                            <Link
                                href={route('login')}
                                className={`${isDarkMode ? 'text-gray-100 hover:text-gray-200' : 'text-gray-600'}  underline text-sm  hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Already registered?
                            </Link>


                        </div>
                    </form>
                </div>
            </div>

        </AdminLayout>
    );
}
