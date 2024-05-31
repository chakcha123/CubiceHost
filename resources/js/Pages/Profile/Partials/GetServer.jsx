import { useRef, useState, useContext } from 'react';
import { useForm } from '@inertiajs/react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function GetServer({ className = '' }) {
    const [confirmingServerAccess, setConfirmingServerAccess] = useState(false);
    const { isDarkMode } = useContext(DarkModeContext);

    const {
        data,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        serverAccess: true,
    });

    const requestServerAccess = (e) => {
        e.preventDefault();

        // Set serverAccess to true before sending the request
        setData('serverAccess', false);

        post(route('server.access'), data, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
        closeModal()
    };
    const OpenModal = () => {
        setConfirmingServerAccess(true);
    };

    const closeModal = () => {
        setConfirmingServerAccess(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className={`${isDarkMode ? 'text-white ' : ' text-gray-900'}text-lg font-medium `}>Get Your Minecraft Server</h2>

                <p className={`${isDarkMode ? 'text-gray-200 ' : ' text-gray-900'} text-lg font-medium mt-1 text-sm `}>
                Setting up your own Minecraft server allows you to customize your gameplay and invite friends to join your world. Before getting started, make sure to review all necessary steps and prepare your server environment for the best experience.
                </p>
            </header>

            <button className="block mt-6 w-full py-2 text-center text-white bg-teal-600 border border-teal-600 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium" onClick={OpenModal}>Request Server Access</button>

            <Modal show={confirmingServerAccess} onClose={closeModal} className={`${isDarkMode ? 'text-white bg-slate-800' : ' text-gray-900'}`}>
                <form onSubmit={requestServerAccess} className="p-6">
                    {/* ... */}
                    <h2 className={`${isDarkMode ? 'text-white ' : ' text-gray-900 '} text-lg font-medium `}>
                        Do you want to request access to the server?
                    </h2>
                    {/* ... */}
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <button type='submit' className="block ml-2 p-2 text-center text-white bg-teal-600 border border-teal-600 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium" >
                            Request Access
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
