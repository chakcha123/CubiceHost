import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import GetServer from './Partials/GetServer';
import { Head } from '@inertiajs/react';
import { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';
import TerminateServer from './Partials/TerminateServer';



export default function Edit({ auth, mustVerifyEmail, status }) {
    const { isDarkMode } = useContext(DarkModeContext);
    console.log(auth.user.hasServer)
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className={`${isDarkMode ? 'text-white border border-gray-500' : ' text-gray-900'} shadow px-6 py-7 rounded-lg overflow-hidden`}>

                        {!auth.user.hasServer ? <GetServer className="max-w-3xl mx-auto" /> : <TerminateServer className="max-w-3xl mx-auto" />}
                    </div>
                    <div className={`${isDarkMode ? 'text-white border border-gray-500' : ' text-gray-900'} shadow px-6 py-7 rounded-lg overflow-hidden`}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-3xl mx-auto"
                        />
                    </div>

                    <div className={`${isDarkMode ? 'text-white border border-gray-500' : ' text-gray-900'} shadow px-6 py-7 rounded-lg overflow-hidden`}>
                        <UpdatePasswordForm className="max-w-3xl mx-auto" />
                    </div>

                    <div className={`${isDarkMode ? 'text-white border border-gray-500' : ' text-gray-900'} shadow px-6 py-7 rounded-lg overflow-hidden`}>
                        <DeleteUserForm className="max-w-3xl mx-auto" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
