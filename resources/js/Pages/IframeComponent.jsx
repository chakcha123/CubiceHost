import React, { useState, useEffect } from 'react';

const IframeComponent = ({ auth }) => {
    const [isActive, setIsActive] = useState(false);

    const [progress, setProgress] = useState(0);
    const [iframeSrc, setIframeSrc] = useState(null);

    useEffect(() => {
        // Fetch the port number for the given username
        const fetchPort = async () => {
            try {
                const response = await fetch(`http://158.179.219.229:5000/get_port_by_username?username=${auth.user.name.toLowerCase()}`);
                const data = await response.json();

                if (data && data.port) {
                    setIframeSrc(`http://158.179.219.229:${data.port}`);
                } else {
                    console.error('Port not found for the given username:', data);
                }
            } catch (error) {
                console.error('Error fetching port:', error);
            }
        };

        fetchPort();
    }, [auth.user.name]);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        setIsActive(false);
                        setProgress(0);

                        // Execute the fetch request after progress completes
                        fetch(`http://158.179.219.229:5000/Stop?container_name=${auth.user.name.toLowerCase()}-minecraft-1&username=${auth.user.name.toLowerCase()}`, {
                            method: 'POST',
                        })
                            .then(response => response.text())
                            .then(result => {
                                console.log(result);
                            })
                            .catch(error => {
                                console.error('Error during script execution:', error);
                            });

                        return 100;
                    }
                    return prevProgress + 1;
                });
            }, 30);
        }

        return () => clearInterval(interval);
    }, [isActive, auth.user.name]);

    const executeScript = () => {
        setIsActive(true);
        setProgress(0);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl mx-auto aspect-video"> {/* Aspect Ratio 16:9 */}
            <iframe
                className="w-full h-full"
                id="terminalFrame"
                src={iframeSrc}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
        <div className="mt-4">
            <button
                className={`relative px-6 py-2 bg-red-500 rounded-full cursor-pointer shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'w-10 h-10' : 'w-36 h-10'}`}
                onClick={executeScript}
                disabled={isActive}
            >
                <div
                    className={`absolute top-0 left-0 h-full bg-red-700 transition-all duration-[3s] ease-in-out`}
                    style={{ width: `${progress}%` }}
                ></div>
                <span
                    className={`relative z-10 text-white text-base font-medium transition-opacity duration-200 ease-in-out ${isActive ? 'opacity-0' : 'opacity-100'}`}
                >
                    {isActive ? '' : 'Stop'}
                </span>
            </button>
        </div>
    </div>
    );
};

export default IframeComponent;
