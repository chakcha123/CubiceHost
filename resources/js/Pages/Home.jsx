import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import banner from './imges/banner.jpg'
import { Link } from 'react-scroll';
import React, { useState, useRef, useContext } from 'react';
import './banner.css'
import { DarkModeContext } from '@/Layouts/DarkModeProvider';
// import Team from './team';
import chkpic from './imges/chk-p.jpeg'
import medpic from './imges/med-p.jpeg'



const AccordionItem = ({ index, isActive, handleToggle, question, answer }) => {
    const contentRef = useRef(null);
    const { isDarkMode } = useContext(DarkModeContext);


    return (
        <div className={`relative transition-all duration-300 border rounded-xl hover:shadow-sm ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : ''}`}>
            <div
                onClick={() => handleToggle(index)}
                className="w-full p-4 text-left cursor-pointer"
            >
                <div className="flex items-center justify-between">
                    <span className="tracking-wide">{question}</span>
                    <span
                        className={`transition-transform duration-200 transform ${isActive ? 'rotate-180' : ''}`}
                    >
                        <svg
                            className="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </span>
                </div>
            </div>

            <div
                ref={contentRef}
                style={{
                    maxHeight: isActive ? `${contentRef.current.scrollHeight}px` : '0',
                }}
                className="relative overflow-hidden transition-all duration-300 max-h-0"
            >
                <div className={`${isDarkMode ? ' text-gray-100' : 'ext-gray-600 '} px-6 pb-4 t`}>{answer}</div>
            </div>
        </div>
    );
};

const FAQAccordion = () => {
    const [activeTab, setActiveTab] = useState(null);

    const handleToggle = (idx) => {
        setActiveTab(activeTab === idx ? null : idx);
    };

    return (
        <div className="container m-auto my-36">
            <div className="flex justify-center text-3xl">Frequently Asked Questions</div>
            <div className="grid gap-3 py-8 text-lg leading-6 text-gray-800 md:gap-8 md:grid-cols-2">
                <div className="space-y-3">
                    <AccordionItem
                        index={1}
                        isActive={activeTab === 1}
                        handleToggle={handleToggle}
                        question="What is x-data?"
                        answer="Declare a new Alpine component and its data for a block of HTML."
                    />
                    <AccordionItem
                        index={2}
                        isActive={activeTab === 2}
                        handleToggle={handleToggle}
                        question="What is x-bind?"
                        answer="Dynamically set HTML attributes on an element."
                    />
                </div>
                <div className="space-y-3">
                    <AccordionItem
                        index={3}
                        isActive={activeTab === 3}
                        handleToggle={handleToggle}
                        question="What is $store?"
                        answer="Access a global store registered using Alpine.store(...)."
                    />
                    <AccordionItem
                        index={4}
                        isActive={activeTab === 4}
                        handleToggle={handleToggle}
                        question="What is x-on?"
                        answer="Listen for browser events on an element."
                    />
                </div>
                <div className="space-y-3">
                    <AccordionItem
                        index={5}
                        isActive={activeTab === 5}
                        handleToggle={handleToggle}
                        question="What is $store?"
                        answer="Access a global store registered using Alpine.store(...)."
                    />
                    <AccordionItem
                        index={6}
                        isActive={activeTab === 6}
                        handleToggle={handleToggle}
                        question="What is x-on?"
                        answer="Listen for browser events on an element."
                    />
                </div>
                <div className="space-y-3">
                    <AccordionItem
                        index={7}
                        isActive={activeTab === 7}
                        handleToggle={handleToggle}
                        question="What is $store?"
                        answer="Access a global store registered using Alpine.store(...)."
                    />
                    <AccordionItem
                        index={8}
                        isActive={activeTab === 8}
                        handleToggle={handleToggle}
                        question="What is x-on?"
                        answer="Listen for browser events on an element."
                    />
                </div>
            </div>
        </div>
    );
};


export default function Home({ auth }) {


    const { isDarkMode } = useContext(DarkModeContext);

    return (
        <AdminLayout
            user={auth.user}
        >
            <Head title="Home" />




            <section className="relative h-[540px] flex flex-col items-center justify-center text-center text-white " id='banner'>
                <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                    <img className="min-w-full min-h-full absolute object-cover"
                        src={banner}
                        alt="Banner Image" />
                </div>
                <div className="mt-80 z-10">
                    {/* <h4 className='h1'><span class='one'>C</span><span class='two'>u</span><span class='three'>b</span><span class='four'>i</span><span class='five'>c</span><span class='six'>H</span><span class='three'>o</span><span class='four'>s</span><span class='five'>t</span></h4> */}

                </div>
            </section>






            <div className={` px-2 py-10 ${isDarkMode ? 'bg-slate-800 text-gray-100' : ''}`}>

                <div id="features" className="mx-auto max-w-6xl">
                    <p className="text-center text-base font-semibold leading-7 text-primary-500">Features</p>
                    <h2 className={`text-center font-display text-3xl font-bold tracking-tight  md:text-4xl ${isDarkMode ? ' text-gray-100' : 'text-slate-900'}`}>
                        Writing has never been so easy
                    </h2>
                    <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                        <li className={`rounded-xl  px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>

                            <img src="https://www.svgrepo.com/show/530438/ddos-protection.svg" alt="" className="mx-auto h-10 w-10" />
                            <h3 className="my-3 font-display font-medium">Powered by ChatGPT</h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                the cutting-edge language model that makes interactions a breeze. With its user-friendly interface,
                                effortlessly tap into the world of AI-generated text.
                            </p>

                        </li>
                        <li className={`rounded-xl px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>

                            <img src="https://www.svgrepo.com/show/530442/port-detection.svg"
                                alt="" className="mx-auto h-10 w-10" />
                            <h3 className="my-3 font-display font-medium">Easy to use</h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                Simply input your subject, click the generate button, and the result will appear in seconds just like
                                magick.
                            </p>

                        </li>
                        <li className={`rounded-xl px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>
                            <img src="https://www.svgrepo.com/show/530444/availability.svg" alt="" className="mx-auto h-10 w-10" />
                            <h3 className="my-3 font-display font-medium">Custom settings</h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                We offer advanced customization. You can freely combine options like roles, languages, publish, tones,
                                lengths,
                                and formats.
                            </p>

                        </li>
                        <li className={`rounded-xl px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>
                            <a href="/pricing" className="group">
                                <img src="https://www.svgrepo.com/show/530440/machine-vision.svg" alt="" className="mx-auto h-10 w-10" />
                                <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Free trial</h3>
                                <p className="mt-1.5 text-sm leading-6 text-secondary-500">We offer a free trial service without login. We
                                    provide
                                    many payment options including pay-as-you-go and subscription.</p>
                            </a>
                        </li>
                        <li className={`rounded-xl px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>
                            <a href="/templates" className="group">
                                <img src="https://www.svgrepo.com/show/530450/page-analysis.svg" alt="" className="mx-auto h-10 w-10" />
                                <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
                                    90+ templates
                                </h3>
                                <p className="mt-1.5 text-sm leading-6 text-secondary-500">We offer many templates covering areas such as
                                    writing,
                                    education, lifestyle and creativity to inspire your potential. </p>
                            </a>
                        </li>
                        <li className={`rounded-xl px-6 py-8  ${isDarkMode ? 'bg-slate-700 border border-gray-500 text-gray-100' : 'bg-white border border-gray-200 shadow-lg'}`}>
                            <a href="/download" className="group">
                                <img src="https://www.svgrepo.com/show/530453/mail-reception.svg" alt="" className="mx-auto h-10 w-10" />
                                <h3 className="my-3 font-display font-medium group-hover:text-primary-500">Use Anywhere</h3>
                                <p className="mt-1.5 text-sm leading-6 text-secondary-500">Our product is compatible with multiple platforms
                                    including Web, Chrome, Windows and Mac, you can use MagickPen anywhere.</p>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>


            <section className="">
                <div className="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold text-center sm:text-5xl">New Features</h2>
                        <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">Explore the latest features that enhance your learning experience and make it even more exciting.</p>
                    </div>
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="mt-4 space-y-12">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="lucide lucide-rocket">
                                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z">
                                                </path>
                                                <path
                                                    d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z">
                                                </path>
                                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                                            </svg></div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi ">Advanced Learning Algorithms</h4>
                                        <p className="mt-2 ">Discover our improved learning algorithms that adapt to your preferences and provide even more personalized learning suggestions.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="lucide lucide-bookmark-plus">
                                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                                                <line x1="12" x2="12" y1="7" y2="13"></line>
                                                <line x1="15" x2="9" y1="10" y2="10"></line>
                                            </svg></div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi ">Interactive Learning Resources</h4>
                                        <p className="mt-2 ">Access an extensive library of interactive resources that make your learning journey engaging and interactive.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="lucide lucide-video">
                                                <path d="m22 8-6 4 6 4V8Z"></path>
                                                <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                                            </svg></div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi ">Enhanced Video Streaming</h4>
                                        <p className="mt-2 ">Experience seamless video integration with enhanced streaming capabilities, providing a better and more uninterrupted learning experience.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="lucide lucide-file-question">
                                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                                <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
                                                <path d="M12 17h.01"></path>
                                            </svg></div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium leadi ">Advanced Quiz Generation </h4>
                                        <p className="mt-2 ">Take your knowledge testing to the next level with advanced quiz generation, providing more customization options for your quizzes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div aria-hidden="true" className="mt-10 lg:mt-0">
                            <img width="600" height="600" src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080" className="mx-auto rounded-lg shadow-lg dark-bg-gray-500" />
                        </div>
                    </div>
                </div>
            </section>



            <div>

                <div className="pt-20 max-w-screen-lg mx-auto">
                    <div className="text-center mb-4">
                        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                            THE TEAM
                        </p>
                        <h3 className={` ${isDarkMode ? ' text-white' : 'text-gray-900'} text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight `}>
                            Our Team
                        </h3>
                    </div>
                    <div className="sm:grid grid-cols-2 gap-6 my-10">

                        <div className="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-10 ">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                                style={{ backgroundImage: `url(${medpic})` }}
                                title="Woman holding a mug">
                            </div>
                            <div
                                className={`border-r border-b border-l border-gray-600 lg:border-l-0 lg:border-t lg:border-gray-600 ${isDarkMode ? 'bg-slate-700 text-gray-100' : 'bg-white'} rounded-b lg:rounded-b-none lg:rounded-r p-4`}>
                                <div className="">
                                    <a href="#"
                                        className={` ${isDarkMode ? ' text-white' : 'text-gray-900'} font-bold text-xl mb-2  `}>
                                        MedXD</a>
                                    <p className={` ${isDarkMode ? ' text-gray-100' : 'text-gray-600'}  text-sm `}>
                                        pssy                                </p>
                                    <p className={`${isDarkMode ? ' text-gray-50' : 'text-gray-500'}   text-base mt-4`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>

                                    <div className="my-4 flex">
                                            <a href="https://github.com/MedXD2002">
                                            <svg
                                                width="16px"
                                                height="16px"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 97.707 97.707"
                                                role="img"
                                                aria-label="GitHub"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                                    fill="#000000"
                                                />
                                            </svg>
                                        </a>



                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-10">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                                style={{ backgroundImage: `url(${chkpic})` }}
                                title="Woman holding a mug">
                            </div>
                            <div
                                className={`border-r border-b border-l border-gray-600 lg:border-l-0 lg:border-t lg:border-gray-600 ${isDarkMode ? 'bg-slate-700 text-gray-100' : 'bg-white'} rounded-b lg:rounded-b-none lg:rounded-r p-4`}>
                                <div className="">
                                    <a href="#"
                                        className={` ${isDarkMode ? ' text-white' : 'text-gray-900'} font-bold text-xl mb-2  `}>
                                        Cha_kxa</a>
                                    <p className={` ${isDarkMode ? ' text-gray-100' : 'text-gray-600'}  text-sm `}>
                                        fhamty / mafhamtich
                                    </p>
                                    <p className={`${isDarkMode ? ' text-gray-50' : 'text-gray-500'}   text-base mt-4`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>

                                    <div className="my-4 flex">

                                        <a href="https://github.com/chakcha123">
                                            <svg
                                                width="16px"
                                                height="16px"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 97.707 97.707"
                                                role="img"
                                                aria-label="GitHub"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                                    fill="#000000"
                                                />
                                            </svg>
                                        </a>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>






            <FAQAccordion />





            <Link
                to="banner" // Id of the section you want to scroll to
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>

            </Link>


        </AdminLayout >
    );
}
