import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function ServerInfo({ auth }) {
    const { isDarkMode } = useContext(DarkModeContext);
    const [bedrockPort, setBedrockPort] = useState(null);
    const [javaPort, setJavaPort] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://158.179.219.229:5000/get_ports?username=${auth.user.name.toLowerCase()}`, {
                method: 'GET',
            });

            const data = await response.json();

            if (data && data.ports) {
                setBedrockPort(data.ports["19132/tcp"] || data.ports["19132/udp"]);
                setJavaPort(data.ports["25565/tcp"]);
            } else {
                console.error('Invalid data structure received:', data);
            }
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [auth.user.name]);


    return (

        <section className={`${isDarkMode ? 'bg-slate-800 text-gray-50' : 'bg-white text-black'} p-4 rounded-lg shadow-md`} id="contact">
            <div className="container mx-auto">
                <h2 className="text-xl font-bold mb-2">Server Status</h2>
                {bedrockPort && (
                    <p className={ `${!isDarkMode ?'bg-gray-200' :' bg-gray-700'} text-sm rounded-full px-4 py-2`}>
                        Bedrock: 158.179.219.229:{bedrockPort}
                    </p>
                )}
                {javaPort && (
                    <p className={ `${!isDarkMode ?'bg-gray-200' :' bg-gray-700'} text-sm rounded-full px-4 py-2 mt-2`}>
                        Java: 158.179.219.229:{javaPort}
                    </p>
                )}
            </div>
        </section>

    );
}

