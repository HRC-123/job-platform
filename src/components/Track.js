import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Secnav';
import imgJob from '../assets/img9job.jpg';

const Track = () => {
  const [students, setStudents] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});
 const studentData = [
   {
     id: "16c5",
     jobId: "4722",
     jobTitle: "nbnb",
     name: "bharath sagam",
     email: "sagam@gmail.com",
     resumeUrl: "jhxjhjh",
     dateApplied: "2024-11-06T10:15:33.150Z",
     status: "Rejected",
   },
   {
     id: "6735",
     jobId: "4722",
     jobTitle: "nbnb",
     name: "n qwx",
     email: "c@gmail.com",
     resumeUrl: "jhxjhjh",
     dateApplied: "2024-11-06T10:23:54.478Z",
     status: "Under Review",
   },
   {
     id: "8b6a",
     jobId: "4722",
     jobTitle: "nbnb",
     name: "c",
     email: "n@gmail.com",
     resumeUrl: " ss",
     dateApplied: "2024-11-06T11:28:20.838Z",
     status: "Selected",
   },
   {
     id: "4d30",
     jobId: "4659",
     jobTitle: "Software",
     name: "karthik",
     email: "karthik@gmail.com",
     resumeUrl: "dfghjk",
     dateApplied: "2024-11-06T13:12:48.957Z",
     status: "Rejected",
   },
   {
     id: "1afa",
     jobId: "4659",
     jobTitle: "Software",
     name: "n qwx",
     email: "c@gmail.com",
     resumeUrl: "nbm",
     dateApplied: "2024-11-06T14:36:49.057Z",
     status: "Selected",
   },
   {
     id: "379b",
     jobId: "4722",
     jobTitle: "SOFTWARE DEVELOPER",
     name: "sai",
     email: "sai@gmail.com",
     resumeUrl:
       "https://drive.google.com/file/d/1TI2ttQpm_4IA1ae6prb9nj9Lja2Q0Rs5/view?usp=sharing",
     dateApplied: "2024-11-06T17:45:01.654Z",
     status: "Under Review",
   },
   {
     id: "962b",
     jobId: "4722",
     jobTitle: "SOFTWARE DEVELOPER",
     name: "Nitish",
     email: "nitish@gmail.com",
     resumeUrl:
       "https://drive.google.com/file/d/1TI2ttQpm_4IA1ae6prb9nj9Lja2Q0Rs5/view?usp=sharing",
     dateApplied: "2024-11-06T18:20:52.433Z",
     status: "Selected",
   },
 ];
  useEffect(() => {
    // const fetchStudents = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8002/students');
    //     setStudents(response.data);
    //     setUpdatedStatus(response.data.reduce((acc, student) => {
    //       acc[student.id] = student.status;
    //       return acc;
    //     }, {}));
    //   } catch (error) {
    //     console.error('Error fetching students:', error);
    //   }
    // };

    // fetchStudents();

        const candidatesData = localStorage.getItem("students");
    console.log(candidatesData);
    
     if (candidatesData) {
       // Parse the string data from localStorage to convert it to an array
       setStudents(JSON.parse(candidatesData));
     } else {
       // If no data in localStorage, use the default `jobs` array and store it in localStorage
       setStudents(studentData);
       localStorage.setItem("students", JSON.stringify(studentData));
     }
  }, []);

  const handleStatusChange = (studentId, status) => {
    setUpdatedStatus((prevState) => ({
      ...prevState,
      [studentId]: status,
    }));
  };

  const handleUpdateStatus = (student) => {
    // Update the student's status with the new status from updatedStatus
    const updatedStudent = { ...student, status: updatedStatus[student.id] };

    // Update the students array with the modified student data
    const updatedStudents = students.map((s) =>
      s.id === student.id ? updatedStudent : s
    );

    // Update the state and save the modified array to localStorage
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };


  return (
    <div>
      <Navbar />
      <div className="p-4" style={{
        background: 'linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
        backgroundImage: `url(${imgJob})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.1)',
        minHeight: '100vh',
      }}>
        <h2 className="mt-20 text-4xl font-semibold text-center   mb-4 text-black">APPLIED STUDENTS</h2>

        <table className="min-w-full bg-gray-800 border rounded-lg shadow-lg border-gray-100">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-2xl border">Name</th>
              <th className="py-2 px-4 text-2xl  border">Email</th>
              <th className="py-2 px-4 text-2xl  border">Job Title</th>
              <th className="py-2 px-4 text-2xl  border">Resume</th>
              <th className="py-2 px-4 text-2xl  border">Status</th>
              <th className="py-2 px-4 text-2xl  border">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className=" border-b border-gray-300">
                <td className="py-2 px-4 text-center text-white text-xl border">{student.name}</td>
                <td className="py-2 px-4 text-center text-white border">{student.email}</td>
                <td className="py-2 px-4 text-center text-white border">{student.jobTitle}</td>
                <td className="py-2 px-4 text-center border">
                  <button 
                    onClick={() => window.open(student.resumeUrl, "_blank")} 
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    View
                  </button>
                </td>
                <td className="py-2 px-4 text-center border">
                  <span className="px-2 py-1 rounded" style={{
                    backgroundColor: {
                      'Under Review': 'gray',
                      'Interview Scheduled': 'violet',
                      'Selected': 'green',
                      'Rejected': 'red',
                    }[student.status],
                    color: 'white',
                  }}>
                    {student.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-center border">
                  <select
                    value={updatedStatus[student.id] || student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className="border p-2 bg-black text-white rounded-md"
                  >
                    <option className='bg-gray-600' value="Under Review">Under Review</option>
                    <option className='bg-cyan-950' value="Interview Scheduled">Interview Scheduled</option>
                    <option className='bg-green-700' value="Selected">Selected</option>
                    <option className='bg-red-600' value="Rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(student)}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Track;
