import React from 'react'
import { Link } from 'react-router-dom';   
const Stu_nav = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 text-white p-4 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold">ENTNT </h1></Link> 
        <div className="flex space-x-4">
           
         
          
          <Link to="/profiles">
            <button className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
              Profiles
            </button>
          </Link>

           
          <Link to="/assessment">
            <button className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
               Assessments
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Stu_nav