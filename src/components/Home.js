import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

function HomePage() {
    const navigate = useNavigate();  

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/img2job.jpg')] text-white overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center mr-44 md:ml-72 p-4 md:p-0">
               
                
                <div className="mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
                        <Typewriter
                            options={{
                                strings: ['ENTNT', 'Remote', 'Works'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                </div>
                 
               
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center">
                    <div 
                        onClick={() => navigate('/job-postings')}
                        className="w-56 md:w-64 p-6 border-4 border-black bg-white text-black text-center rounded-lg shadow-custom transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer h-full flex flex-col justify-between"
                    >
                        <h1 className="underline underline-offset-2 md:underline-offset-4 text-lg md:text-2xl font-semibold mb-2">JOB-POSTINGS</h1>
                        {/* <p className="text-gray-600 text-sm md:text-base flex-grow">Explore various job openings tailored to your skills.</p> */}
                    </div>
                    <div 
                        onClick={() => navigate('/profiles')}
                        className="w-56 md:w-64 p-6 border-4 border-black bg-white text-black text-center rounded-lg shadow-custom transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer h-full flex flex-col justify-between"
                    >
                        <h1 className="underline underline-offset-2 md:underline-offset-4 text-lg md:text-2xl font-semibold mb-2">STUDENTS</h1>
                        {/* <p className="text-gray-600 text-sm md:text-base flex-grow">Find freelance and short-term assignments here exams.</p> */}
                    </div>
                    {/* <div 
                        onClick={() => navigate('/profiles')}
                        className="w-56 md:w-64 p-6 border-4 border-black bg-white text-black text-center rounded-lg shadow-custom transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer h-full flex flex-col justify-between"
                    >
                        <h1 className="underline underline-offset-2 md:underline-offset-4 text-lg md:text-2xl font-semibold mb-2">STUDENTS</h1>
                         
                    </div> */}
                </div>
            </div>
            
         
            <div className="hidden md:block mb-10 mr-10">
                <img 
                    src={require('../assets/comp-Photoroom.png')}
                    className="w-52 md:w-96 lg:w-[500px] xl:w-[500px] max-h-[200px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
                    alt="Advertisement" 
                />
            </div>
        </div>
    );
}

export default HomePage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Typewriter from 'typewriter-effect';

// function HomePage() {
//     const navigate = useNavigate();  

//     return (
//         <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-cover bg-fixed bg-center bg-no-repeat bg-[url('./assets/img2job.jpg')] text-white">
//             <div className="flex flex-col items-center justify-center text-center md:ml-20 lg:ml-72 p-4 md:p-0">
                
//                 {/* Header with Typewriter Effect */}
//                 <div className="mb-8 md:mb-12">
//                     <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
//                         <Typewriter
//                             options={{
//                                 strings: ['ENTNT', 'Remote', 'Works'],
//                                 autoStart: true,
//                                 loop: true,
//                             }}
//                         />
//                     </h1>
//                 </div>
                
//                 {/* Action Boxes */}
//                 <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center">
//                     <div 
//                         onClick={() => navigate('/job-postings')}
//                         className="w-56 md:w-64 p-4 md:p-6 border-4 border-black bg-white text-black text-center rounded-lg shadow-custom transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
//                     >
//                         <h2 className="underline underline-offset-2 md:underline-offset-4 text-lg md:text-2xl font-semibold mb-1 md:mb-2">Job Postings</h2>
//                         <p className="mt-2 text-gray-600 text-sm md:text-base">Explore various job openings tailored to your skills.</p>
//                     </div>
//                     <div 
//                         onClick={() => navigate('/assignments')}
//                         className="w-56 md:w-64 p-4 md:p-6 border-4 border-black bg-white text-black text-center rounded-lg shadow-custom transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
//                     >
//                         <h2 className="underline underline-offset-2 md:underline-offset-4 text-lg md:text-2xl font-semibold mb-1 md:mb-2">Assignments</h2>
//                         <p className="mt-2 text-gray-600 text-sm md:text-base">Find freelance and short-term assignments here.</p>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Image Section */}
//             <div className="mt-8 md:mt-0 md:block hidden">
//                 <img 
//                     src={require('../assets/imgjob3-removebg.png')}
//                     className="w-72 md:w-96 lg:w-[500px] xl:w-[600px] max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
//                     alt="Advertisement" 
//                 />
//             </div>
//         </div>
//     );
// }

// export default HomePage;
