import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState,useEffect } from 'react';
import IframeComponent from './IframeComponent';
import ImageComponent from './ImageComponent';

export default function Console({ auth }) {
    const [status, setStatus] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const method = 'GET';

    //             const response = await fetch('http://158.179.219.229:5000/messages', {
    //                 method,
    //             });

    //             const data = await response.json();

    //             if (Array.isArray(data)) {

    //                 setStatus(null);
    //             } else if (data && data.status) {
    //                 setStatus(data.status);
    //                 console.log('Received status:', data.status);
    //             } else {
    //                 console.error('Invalid data structure received:', data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching messages:', error);
    //         }
    //     };

    //     fetchData();

    //     const interval = setInterval(fetchData, 500);

    //     return () => clearInterval(interval);
    // }, []);
    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Console" />


            <div className="container-fluid ">
                {/* <h1 className='text-center'>Console</h1> */}
                <center>
                    <div className="terminal-container" id="term">
                        {/* Conditionally render IframeComponent or ImageComponent based on the status */}
                        {status !== 'The process is running!' ? (
                            <ImageComponent />
                        ) : (
                            <IframeComponent />
                        )}
                        <br />

                    </div>
                </center>

            </div>


        </AdminLayout>
    );
}
