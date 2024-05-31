import React, { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

const States = ({count,title ,icon}) => {
    const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className='group'>

        <div className={` ${isDarkMode ? 'bg-slate-700 text-white border border-gray-500' : 'bg-white text-gray-700 '}  relative flex flex-col bg-clip-border rounded-xl shadow-md  transition duration-300 transform group-hover:scale-105`}>
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-creeper to-teal-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            {icon}
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{count}</h4>
          </div>
        </div>
    </div>
  );
}

export default States;
