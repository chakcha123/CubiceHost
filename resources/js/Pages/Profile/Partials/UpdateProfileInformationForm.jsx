import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { isDarkMode } = useContext(DarkModeContext);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className={`${isDarkMode ? 'text-white ' : ' text-gray-900'}text-lg font-medium `}>Profile Information</h2>
                <p className={`${isDarkMode ? 'text-gray-200 ' : ' text-gray-900'} text-lg font-medium mt-1 text-sm `}>
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name">Name</label>
                    <TextInput
                        id="name"
                        className={`${isDarkMode ? 'text-gray-200 bg-slate-800' : ' text-gray-900'} mt-1 block w-full`}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                <label htmlFor="email">Email</label>
                    <TextInput
                        id="email"
                        type="email"
                        className={`${isDarkMode ? 'text-gray-200 bg-slate-800' : ' text-gray-900'} mt-1 block w-full`}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="block items-center gap-4">
                    <button type='submit' className="block mt-6 w-full py-2 text-center text-white bg-teal-600 border border-teal-600 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium" processing={processing}>
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
