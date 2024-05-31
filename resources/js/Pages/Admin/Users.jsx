import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import States from './partials/States';
import Tbody from './partials/Tbody';
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import React, { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';

export default function Users({ auth, users, usersCount ,hasServerCount ,adminCount }) {
    const { isDarkMode } = useContext(DarkModeContext);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // console.log(users)

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
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className='md:p-16 lg:p-24 xl:p-30'>
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 m-10 ">
                    <States count={usersCount} title='Total Users'
                        icon={<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
                        }

                    />
                    <States count={hasServerCount} title='Server Access'
                        icon={
                             <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z" /></svg>

                        }
                    />
                    <States count={adminCount} title='Total Admin'
                        icon={<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z"/></svg>
                        }
                    />
                    <States count={usersCount} title='Total Products'
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                            <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                        }
                    />
                </div>

                <div className={` ${isDarkMode ? 'bg-slate-800 border border-gray-500 text-gray-100' : ' bg-white text-black '} rounded-lg `}>
                    <div className="p-4 flex">

                        <h1 className="text-3xl">Users</h1>

                        <a
                            href={route('user')}
                            className="cursor-pointer ml-auto inline-block px-6 py-3 text-sm font-semibold leading-none text-white bg-creeper hover:bg-creeper rounded shadow-md focus:outline-none focus:shadow-outline">
                            Add User
                        </a>
                    </div>
                    <div className="px-3 py-4 flex justify-center">
                        <table className="w-full text-md shadow-md rounded mb-4 rounded-lg overflow-hidden">
                            <tbody>

                                <tr className="text-gray-900 bg-gradient-to-r from-creeper to-creeper">

                                    <th className="text-left p-3 px-5">ID</th>
                                    <th className="text-left p-3 px-5">UserName</th>
                                    {screenWidth > 720 && (<th className="text-left p-3 px-5">email</th>)}
                                    {screenWidth > 550 && (<th className="text-left p-3 px-5">Has Server</th>)}
                                    {screenWidth > 550 && (<th className="text-left p-3 px-5">Is Admin</th>)}

                                    <th></th>
                                </tr >

                                {
                                    users.data.map((user, index) => {
                                        return (
                                            <Tbody
                                                key={index}
                                                id={user.id}
                                                name={user.name}
                                                email={user.email}
                                                isadmin={user.role}
                                                hasServer={user.hasServer ? <svg xmlns="http://www.w3.org/2000/svg" className='text-green-600' height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" className='text-red-600' height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>}
                                                isAdmin={user.role =='admin'? <svg xmlns="http://www.w3.org/2000/svg" className='text-green-600' height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" className='text-red-600' height="22px" viewBox="0 -960 960 960" width="22px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>}
                                            />
                                        );
                                    })}

                            </tbody>
                        </table>
                    </div>
                    <Pagination data={users} />

                </div>
            </div>
        </AdminLayout>
    );
}
