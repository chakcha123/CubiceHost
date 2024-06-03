import React, { useState, useEffect } from 'react';
import offlineImage from './imges/offline.png';

const ImageComponent = ({ auth }) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const executeScript = () => {
    setIsActive(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsActive(false);
            setProgress(0);

            // Execute the fetch request after progress completes
            fetch(`http://158.179.219.229:5000/Start?container_name=${auth.user.name.toLowerCase()}-minecraft-1&username=${auth.user.name.toLowerCase()}`, {
              method: 'POST',
            })
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error('Error during script execution:', error);
              });
          }, 300);
          return prev;
        }
        return prev + 1;
      });
    }, 30);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <img src={offlineImage} alt="Offline" className=" h-[500px]" />
      </div>
      <div className="mt-10">
        <div
          className={`relative flex items-center justify-center ${
            isActive ? 'h-2' : 'h-10'
          } w-36 bg-green-500 rounded-full cursor-pointer shadow-lg transition-all duration-500 ease-in-out overflow-hidden`}
          onClick={executeScript}
        >
          <div
            className={`absolute top-0 left-0 h-full bg-green-800 transition-all duration-3000 ease-in-out`}
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className={`relative z-10 text-white text-base font-medium transition-opacity duration-200 ease-in-out ${
              isActive ? 'opacity-0' : 'opacity-100'
            } flex items-center justify-center`}
            style={{ width: '100%' }}
          >
            Start
          </div>
          <div
            className={`absolute top-0 left-0 flex items-center justify-center w-full h-full z-10 text-white text-base font-medium transition-opacity duration-200 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Loading... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
