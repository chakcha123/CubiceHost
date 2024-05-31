import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function ServerInfo({ auth }) {
    const { isDarkMode } = useContext(DarkModeContext);
const percentage = 45
    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Serverinfo" />


            <section className={`${isDarkMode ? 'bg-slate-800 text-gray-50' : 'bg-white text-black'}`} id="contact">
                <h1>Ram Usage</h1><br />
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                        className="bg-green-500 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${percentage}%` }}
                    >
                        {percentage}%
                    </div>
                </div>
            </section>



        </AdminLayout>
    );
}
