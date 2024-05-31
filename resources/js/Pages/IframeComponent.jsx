import React, { useState, useEffect } from 'react';

const IframeComponent = () => {
  const [isActive, setIsActive] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 375);
//     };

//     handleResize();

//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

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
            fetch('http://158.179.219.229:5000/Stop', {
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
  }, [isActive]);

  const executeScript = () => {
    setIsActive(true);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full h-0 relative pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <iframe
            className="w-full h-[300px]"
            id="terminalFrame"
            src="http://158.179.219.229:4000"
          ></iframe>
        </div>

      <div className="mt-10">
        <div
          className={`relative flex items-center justify-center h-10 w-36 bg-red-500 rounded-full cursor-pointer shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'h-2' : 'h-10'}`}
          onClick={executeScript}
        >
          <div
            className={`absolute top-0 left-0 h-full bg-red-700 transition-all duration-[3s] ease-in-out`}
            style={{ width: `${progress}%` }}
          ></div>
          <span
            className={`relative z-10 text-white text-base font-medium transition-opacity duration-200 ease-in-out ${isActive ? 'opacity-0' : 'opacity-100'}`}
          >
            Stop
          </span>
          <span
            className={`absolute top-0 left-0 flex items-center justify-center w-full h-full z-10 text-white text-base font-medium transition-opacity duration-200 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
          >
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default IframeComponent;
