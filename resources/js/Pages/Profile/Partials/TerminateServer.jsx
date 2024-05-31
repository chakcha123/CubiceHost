import { useRef, useState, useContext } from 'react';
import { useForm } from '@inertiajs/react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function TerminateServer({ className = '' }) {
    const [confirmingServerTermination, setConfirmingServerTermination] = useState(false);
    const { isDarkMode } = useContext(DarkModeContext);

    const {
        data,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        serverAccess: false, // Initially true, will be set to false to terminate access
    });

    const terminateServerAccess = (e) => {
        e.preventDefault();

        // Set serverAccess to false before sending the request
        setData('serverAccess', true);

        post(route('server.access'), data, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
        closeModal();
    };

    const openModal = () => {
        setConfirmingServerTermination(true);
    };

    const closeModal = () => {
        setConfirmingServerTermination(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>Terminate Your Minecraft Server</h2>

                <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} text-lg font-medium mt-1 text-sm`}>
                    Terminating your Minecraft server will permanently delete all data and resources associated with it. Before proceeding, ensure you have backed up any important data or information you wish to keep.
                </p>
            </header>


            <button className="block mt-6 w-full py-2 text-center text-white bg-red-600 border border-red-600 rounded hover:bg-transparent hover:text-red-500 transition uppercase font-roboto font-medium" onClick={openModal}>
                Terminate Server Access
            </button>

            <Modal show={confirmingServerTermination} onClose={closeModal} className={`${isDarkMode ? 'text-white bg-slate-800' : ' text-gray-900'}`}>
                <form onSubmit={terminateServerAccess} className="p-6">


                    <h2 className={`${isDarkMode ? 'text-white ' : ' text-gray-900 '} text-lg font-medium `}>
                        Are you sure you want to terminate your server access?
                    </h2>


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <button type='submit' className="block ml-2 p-2 text-center text-white bg-red-600 border border-red-600 rounded hover:bg-transparent hover:text-red-500 transition uppercase font-roboto font-medium" >
                            Terminate Access
                        </button>


                    </div>
                </form>
            </Modal>
        </section>
    );
}
