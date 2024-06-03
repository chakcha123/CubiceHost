
import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import './l.css'
import Footer from './Footer';
import { motion } from 'framer-motion';
import { DarkModeContext } from './DarkModeProvider';
import { useContext } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';



const AnimatedSection = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};
export default function AdminLayout({ user, children }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [confirmingDownload, setConfirmingDownload] = useState(false);

    const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);


    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const confirmDownload = () => {
        setConfirmingDownload(true);
    };


    const closeModal = () => {
        setConfirmingDownload(false);
    };


    const isAuth = user !== null;
    const isAdmin = user && user.role === 'admin';

    const darkClasses = ' bg-slate-900  text-gray-100  hover:text-gray-300';
    return (
        <div className={` ${isDarkMode ? darkClasses : 'bg-white text-gray-700 hover:text-gray-900'} `}>

            <nav className={`fixed top-0 z-50 w-full  border-gray-200  shadow-lg ${isDarkMode ? ' bg-slate-900 ' : 'bg-white'}`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 " onClick={toggleSidebar}>
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href={route('home')}
                                className="flex ms-2 md:me-24">
                                {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
                                <span className="self-center text-xl font-semibold sm:text-2xl font-bold flex-shrink-0 text-creeper text-lg">CubiceHost</span>
                            </a>
                        </div>

                        {user !== null ? (
                            <div className="flex items-center">
                                <div className="flex items-center ms-3">

                                    <button onClick={toggleDarkMode}
                                        // className={`h-12 w-12 rounded-lg p-2 hover:bg-gray-100   ${isDarkMode ? 'dark:hover:bg-gray-700' : ''}`}>
                                        className={`h-12 w-12 rounded-lg p-2  `}>
                                        {/* Conditional rendering for SVG icons */}
                                        {isDarkMode ? (
                                            <svg className="fill-violet-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="fill-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                    fillRule="evenodd" clipRule="evenodd"></path>
                                            </svg>
                                        )}
                                    </button>



                                    <div>
                                        <button onClick={toggleDropdown} type="button" className="flex ml-4" >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
                                        </button>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className={`mt-56 mr-2 z-50 absolute mt-12 right-0 w-48 py-1  rounded-md shadow-lg  ${isDarkMode ? 'bg-slate-800 ' : 'bg-white'} ring-1 ring-black ring-opacity-5 `}>
                                            <div className="px-4 py-2" role="none">
                                                <p className={`${isDarkMode ? 'text-white ' : ' text-gray-900'} text-sm `} role="none">
                                                    {user.name}
                                                </p>
                                                <p className={`${isDarkMode ? 'text-white ' : 'text-gray-900'} text-sm font-medium  truncate `} role="none">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <ul className="py-1" role="none">
                                                <a href="profile" className={`${isDarkMode ? 'text-white ' : 'text-gray-700 hover:bg-gray-100'} flex block px-4 py-2 text-sm   `}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" /></svg>

                                                    <p className="ml-4 mt-1" role="menuitem">Profile</p>
                                                </a>


                                                <Dropdown.Link href={route('logout')} method="post" as="button" className={`${isDarkMode ? 'text-white  ' : 'text-gray-700 hover:bg-gray-100 '} flex block px-4 py-2 text-sm  `}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>

                                                    <p className="ml-4 mt-1" role="menuitem">Sign out</p>
                                                </Dropdown.Link>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <button onClick={toggleDarkMode}
                                    // className={`h-12 w-12 rounded-lg p-2 hover:bg-gray-100   ${isDarkMode ? 'dark:hover:bg-gray-700' : ''}`}>
                                    className={`h-12 w-12 rounded-lg p-2  `}>
                                    {/* Conditional rendering for SVG icons */}
                                    {isDarkMode ? (
                                        <svg className="fill-violet-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="fill-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                fillRule="evenodd" clipRule="evenodd"></path>
                                        </svg>
                                    )}
                                </button>

                                <a href={route('login')} className={`h-6 w-6 hover:text-gray-600 text-gray-900 mx-4 ${isDarkMode ? 'text-white hover:text-gray-200' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>

                                </a>
                                <a href={route('register')} className={`h-6 w-6 hover:text-gray-600 text-gray-900 ${isDarkMode ? 'text-white hover:text-gray-200 ' : ''} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" /></svg>


                                </a>
                            </div>
                        )}


                    </div>
                </div>
            </nav>

            <div id="drawer-navigation "
                className={`fixed top-0 f1 left-0 z-40 mt-14  h-screen p-4 overflow-y-auto transition-transform ${isDarkMode ? darkClasses : 'bg-white '}  ${isOpen ? '' : '-translate-x-full'} `}
                tabIndex="-1" aria-labelledby="drawer-navigation-label">

                <div className="py-4 overflow-y-auto">
                    <ul className="flex-1 flex flex-col font-medium space-y-4">
                        <li>
                            <a href={route('home')}
                                className={`flex items-center p-2 mt-4 rounded-lg hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6  group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                                </svg>
                                <span className="ml-3">Home</span>
                            </a>
                        </li>

                        {
                            isAuth && isAdmin ? (
                                <li>
                                    <a href={route('users')}
                                        className={`flex items-center p-2 mt-4 rounded-lg hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                                    </a>
                                </li>
                            )
                                :
                                (<></>)
                        }


                        <li>
                            <a href={route('contact')}
                                className={`flex items-center p-2 mt-4 rounded-lg  hover:text-creeper  ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Contact Us</span>
                            </a>
                        </li>



                        <li>
                            <a href={route('about')}
                                className={`flex items-center p-2 mt-4 rounded-lg  hover:text-creeper  ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">About Us</span>
                            </a>
                        </li>

                        {
                            isAuth && user.hasServer ? (
                                <>
                                    <li>
                                        <a href={route('console')}
                                            className={`flex items-center p-2 mt-4 rounded-lg  hover:text-creeper  ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z" /></svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Console</span>
                                        </a>
                                    </li>

                                    {/* {user.hasServer ? (
                                        <li>
                                            <a href={route('serverinfo')}
                                                className={`flex items-center p-2 mt-4 rounded-lg  hover:text-creeper  ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z" /></svg>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Server</span>
                                            </a>
                                        </li>
                                    ) : (<></>)} */}

                                </>
                            ) : (<></>)
                        }



                        <li className='mt-auto'>
                            <button onClick={confirmDownload}
                                className={`flex items-center p-2 mt-4 rounded-lg  hover:text-creeper  ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}  group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Download</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Transition
                show={confirmingDownload}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Modal
                    show={confirmingDownload}
                    onClose={closeModal}
                    className={`${isDarkMode ? 'text-white bg-slate-800' : 'text-gray-900'}`}
                >
                    <form className="p-6">
                        <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>
                            Download Minecraft for Mobile
                        </h2>
                        <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'} text-lg font-medium mt-1 text-sm`}>
                            Confirm your download of the Minecraft mobile version (.apk).
                            This file is optimized for Android and IOS phones.


                        </p>
                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mr-1' height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                                Cancel</SecondaryButton>
                            <a href='/download'
                                // type="submit"
                                className="flex block ml-2 p-2 text-center text-white bg-teal-600 border border-teal-600 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium"
                            // className={`flex ms-3 p-2 rounded ${isDarkMode ? 'bg-gray-600 text-white p-2 border border-gray-400' : 'border border-gray-600 bg-gray-200 text-gray-900'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`mr-1 w-6 h-6 group-hover:text-creeper ${isDarkMode ? 'text-gray-100' : 'text-gray-900 '}`} height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>

                                Download
                            </a >
                        </div>
                    </form>
                </Modal>
            </Transition>


            <div className={`p-4 ${isDarkMode ? 'bg-slate-800 text-gray-100' : ''} ${isOpen ? 'ml-0 blur-background' : 'ml-0 '} `}>
                {/* Your main content */}
                <div className={`p-1  rounded-lg  mt-12  ${isDarkMode ? '   bg-slate-800  text-gray-100 ' : ''}  `}>
                    <AnimatedSection>
                        {children}
                        <Footer />
                    </AnimatedSection>

                </div>
            </div>

        </div>
    );
}
