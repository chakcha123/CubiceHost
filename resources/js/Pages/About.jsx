import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import img from './imges/about.jpg';
import React, { useContext } from 'react';
import { DarkModeContext } from '@/Layouts/DarkModeProvider';


export default function AboutUs({ auth }) {
    const { isDarkMode } = useContext(DarkModeContext);


    return (
        <AdminLayout user={auth.user}>
            <Head title="About Us" />



            <section className={` ${isDarkMode ? 'bg-slate-800' : 'bg-white'} md:p-16 lg:p-24 xl:p-30 `}>
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="max-w-lg">
                            <h2 className={` ${isDarkMode ? 'text-white ' : 'text-gray-900'} text-3xl font-extrabold  sm:text-4xl`}>About Us</h2>
                            <p className={` ${isDarkMode ? 'text-white ' : 'text-gray-600'} mt-4  text-lg`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
                                eros at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis elit efficitur consequat.
                                Mauris eleifend velit a pretium iaculis. Donec sagittis velit et magna euismod, vel aliquet nulla
                                malesuada. Nunc pharetra massa lectus, a fermentum arcu volutpat vel.</p>
                            <div className="mt-8">
                                <a href="#" className="text-creeper hover:text-creeper font-medium">Learn more about us
                                    <span className="ml-2">&#8594;</span></a>
                            </div>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <img src={img} alt="About Us Image" className="object-cover rounded-lg shadow-md" />
                        </div>
                    </div>
                </div>
            </section>
            </AdminLayout>
    );
}
