import { Inertia } from '@inertiajs/inertia';
import { useState, useEffect } from 'react';
import React, { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';


const Tbody = (props) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { isDarkMode } = useContext(DarkModeContext);

    const handleDelete = (id) => {
        if (confirm(`Are you sure you want to delete this user with ID ${id}?`)) {
            Inertia.delete(route('users.destroy', id));
        }
    };
    const handleEdit = (id) => {
        Inertia.get(route('users.edit', id));
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <tr className={`${isDarkMode ? 'hover:bg-slate-600 bg-slate-800 border-gray-500' : 'hover:bg-gray-200 ' }  border-b  `}>

            <td className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700' } p-5 px-5 `}>{props.id}</td>
            <td className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700' } p-5 px-5 `}>{props.name}</td>
            {screenWidth > 720 && <td className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700' } p-5 px-5`}>{props.email}</td>}
            {screenWidth > 550 && <td className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700' } text-center p-5 px-5`}>{props.hasServer}</td>}
             {screenWidth >550 && <td className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700' } text-center p-5 px-5`}>{props.isAdmin}</td>}

            {props.isadmin !=='admin'?
            (<td className="p-5 px-5 flex items-center ">
                <div className='flex  my-auto'>
                    {/* <button
                        onClick={() => handleEdit(props.id)}
                        type="button"
                        className="mr-3 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button> */}
                    <button
                        type="button"
                        onClick={() => handleDelete(props.id)}
                        className="text-sm text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        {/* Delete */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
            </td>  ) : (
        <td className='flex p-5  text-red-500'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </td>
    )}

        </tr>
    );
};

export default Tbody;
