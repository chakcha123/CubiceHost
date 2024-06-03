Console.jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect, useContext } from 'react';
import IframeComponent from './IframeComponent';
import ImageComponent from './ImageComponent';
import ServerInfo from './ServerInfo';

export default function Console({ auth }) {
    const [status, setStatus] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://158.179.219.229:5000/messages?container_name=${auth.user.name.toLowerCase()}-minecraft-1`, {
                    method: 'GET',
                });

                const data = await response.json();

                if (data && data.status) {
                    setStatus(data.status);
                    console.log('Received status:', data.status);
                } else {
                    console.error('Invalid data structure received:', data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 5000); // Adjusted interval to 5000ms (5 seconds) for better performance

        return () => clearInterval(interval);
    }, [auth.user.name]);

    return (
        <AdminLayout user={auth.user}>
            <Head title="Console" />
            <div className="container-fluid">
                <center>
                    <div className="terminal-container" id="term">
                        {/* Conditionally render IframeComponent or ImageComponent based on the status */}
                        {status === 'The container is running!' ? (
                            <div>

                                <IframeComponent auth={auth} />
                                <ServerInfo auth={auth} />
                            </div>


                        ) : (
                            <ImageComponent auth={auth} />

                        )}
                        <br />
                    </div>
                </center>
            </div>
        </AdminLayout>
    );
}


