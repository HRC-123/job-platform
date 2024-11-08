import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import imgJob from  '../assets/img9job.jpg'

 

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    numberOfPosts: 0,
    skillsRequired: '',
    location: '',
    hiringType: '',
    diversityHiring: false,
  });
  const navigate = useNavigate();

  const jobs = [
    {
      id: "4722",
      title: "SOFTWARE DEVELOPER",
      description: "To develope efficient and user friendly applications",
      candidatesApplied: "10",
      numberOfPosts: 1,
      skillsRequired: "Dta structures,OOPS,System design",
      location: "Delhi",
      hiringType: "Intern",
      diversityHiring: false,
    },
    {
      id: "4659",
      title: "FLUTTER DEVELOPER",
      description: "Developing user friendly responsive Apps",
      numberOfPosts: 1,
      skillsRequired: "React native,Flutter,Figma",
      location: "Bangalore",
      hiringType: "Interns",
      diversityHiring: true,
    },
    {
      id: "ba81",
      title: "FULL STACK DEVELOPER",
      description: "Developing responsive applications",
      numberOfPosts: "10",
      skillsRequired: "javascript,React,Node",
      location: "Hyderabad",
      hiringType: "Full time",
      diversityHiring: true,
    },
    {
      id: "cb61",
      title: "AI DEVELOPER",
      description: "",
      numberOfPosts: 0,
      skillsRequired: "Machine learning,Python",
      location: "hyd",
      hiringType: "Intern",
      diversityHiring: false,
    },
  ];

  const studentData = [{
    "id": "16c5",
    "jobId": "4722",
    "jobTitle": "nbnb",
    "name": "bharath sagam",
    "email": "sagam@gmail.com",
    "resumeUrl": "jhxjhjh",
    "dateApplied": "2024-11-06T10:15:33.150Z",
    "status": "Rejected"
  },
    {
      "id": "6735",
      "jobId": "4722",
      "jobTitle": "nbnb",
      "name": "n qwx",
      "email": "c@gmail.com",
      "resumeUrl": "jhxjhjh",
      "dateApplied": "2024-11-06T10:23:54.478Z",
      "status": "Under Review"
    },
    {
      "id": "8b6a",
      "jobId": "4722",
      "jobTitle": "nbnb",
      "name": "c",
      "email": "n@gmail.com",
      "resumeUrl": " ss",
      "dateApplied": "2024-11-06T11:28:20.838Z",
      "status": "Selected"
    },
    {
      "id": "4d30",
      "jobId": "4659",
      "jobTitle": "Software",
      "name": "karthik",
      "email": "karthik@gmail.com",
      "resumeUrl": "dfghjk",
      "dateApplied": "2024-11-06T13:12:48.957Z",
      "status": "Rejected"
    },
    {
      "id": "1afa",
      "jobId": "4659",
      "jobTitle": "Software",
      "name": "n qwx",
      "email": "c@gmail.com",
      "resumeUrl": "nbm",
      "dateApplied": "2024-11-06T14:36:49.057Z",
      "status": "Selected"
    },
    {
      "id": "379b",
      "jobId": "4722",
      "jobTitle": "SOFTWARE DEVELOPER",
      "name": "sai",
      "email": "sai@gmail.com",
      "resumeUrl": "https://drive.google.com/file/d/1TI2ttQpm_4IA1ae6prb9nj9Lja2Q0Rs5/view?usp=sharing",
      "dateApplied": "2024-11-06T17:45:01.654Z",
      "status": "Under Review"
    },
    {
      "id": "962b",
      "jobId": "4722",
      "jobTitle": "SOFTWARE DEVELOPER",
      "name": "Nitish",
      "email": "nitish@gmail.com",
      "resumeUrl": "https://drive.google.com/file/d/1TI2ttQpm_4IA1ae6prb9nj9Lja2Q0Rs5/view?usp=sharing",
      "dateApplied": "2024-11-06T18:20:52.433Z",
      "status": "Selected"
    }];

  // useEffect(() => {
  //   axios.get('http://localhost:8001/jobs')
  //     .then(response => setJobPostings(response.data))
  //     .catch(error => console.error("Error fetching job postings:", error));
  // }, []);

  useEffect(() => {
    // axios.get('http://localhost:8002/students')
    //   .then(response => setStudents(response.data))
    //   .catch(error => console.error("Error fetching students data:", error));
    
    const candidatesData = localStorage.getItem("students");
    console.log(candidatesData);
    
    
    const jobsData = localStorage.getItem("jobs");
    console.log(jobsData);

    if (jobsData) {
      // Parse the string data from localStorage to convert it to an array
      setJobPostings(JSON.parse(jobsData));
    } else {
      // If no data in localStorage, use the default `jobs` array and store it in localStorage
      setJobPostings(jobs);
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    if (candidatesData) {
      // Parse the string data from localStorage to convert it to an array
      setStudents(JSON.parse(candidatesData));
    } else {
      // If no data in localStorage, use the default `jobs` array and store it in localStorage
      setStudents(studentData);
      localStorage.setItem("students", JSON.stringify(studentData));
    }
  }, []);

  useEffect(() => {
    if (students.length) {
      const jobCounts = students.reduce((acc, student) => {
        const jobTitle = student.appliedJobTitle;
        if (jobTitle) {
          acc[jobTitle] = (acc[jobTitle] || 0) + 1;
        }
        return acc;
      }, {});

      setJobPostings(prevJobs => prevJobs.map(job => ({
        ...job,
        candidatesApplied: jobCounts[job.title] || 0
      })));
    }
  }, [students]);

  const handleCardClick = (jobId) => {
    navigate(`/job-postings/${jobId}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJob({
      ...newJob,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const handleAddJob = () => {
  // Check if the title field is provided
  if (!newJob.title) {
    console.error("Title is required.");
    // setError("Please enter a job title.");
    return;
  }

  // Exclude the `candidatesApplied` field and include only necessary fields
  const { candidatesApplied, ...newJobData } = newJob;

  // Assign a unique ID to the new job (using Date.now if no ID is provided)
  newJobData.id = newJobData.id || Date.now().toString();

  // Retrieve current jobs data from localStorage
  const jobsData = localStorage.getItem("jobs");
  const jobsArray = jobsData ? JSON.parse(jobsData) : [];

  // Add the new job to the jobs array
  const updatedJobsArray = [...jobsArray, newJobData];

  // Update localStorage with the new job
  localStorage.setItem("jobs", JSON.stringify(updatedJobsArray));

  // Update the job postings state and close the modal
  setJobPostings(updatedJobsArray);
  setShowModal(false);
  // setError(null); // Clear any previous errors
};



  if (!jobPostings?.length) {
    return <div>Loading job postings...</div>;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${imgJob})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',   
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.2)',  
      }}
    >
      <Navbar onAddJob={() => setShowModal(true)} />

      <div className="pt-36 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPostings.map((job) => (
          <div
            key={job.id}
            className="bg-gray-800 p-6 rounded-lg cursor-pointer border-cyan-50 transition-shadow duration-300 ease-out transform hover:shadow-lg hover:-translate-y-1"
            onClick={() => handleCardClick(job.id)}
            style={{
              minHeight: '180px',
              boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
              borderBlockColor:'white',
              color: 'white'
            }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: '#F4A261' }}>{job.title}</h3>
            <p className="font-semibold" style={{ color: '#E9C46A' }}>{job.description.slice(0, 100)}...</p>
            <p className="mt-2" style={{ color: '#2A9D8F' }}>Candidates Applied: {job.candidatesApplied}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full" style={{
            maxWidth: '700px',    
            height: 'auto',        
            padding: '2rem',       
            marginTop: '10vh',     
            marginBottom: '10vh',   
          }}>
            <h3 className="text-2xl text-orange-400 font-bold mb-4">Add New Job</h3>
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleInputChange}
              className="p-4 border border-gray-300 rounded w-full mb-2"
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={newJob.description}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="number"
              name="numberOfPosts"
              placeholder="Number of Posts"
              value={newJob.numberOfPosts}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="text"
              name="skillsRequired"
              placeholder="Skills Required"
              value={newJob.skillsRequired}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full mb-2"
            />
            <input
              type="text"
              name="hiringType"
              placeholder="Hiring Type"
              value={newJob.hiringType}
              onChange={handleInputChange}
              className="p-2 border text-slate-950 border-gray-300 rounded w-full mb-2"
            />
            <label className="flex items-center text-orange-400 mb-2">
              <input
                type="checkbox"
                name="diversityHiring"
                checked={newJob.diversityHiring}
                onChange={handleInputChange}
                className="mr-2   "
              />
              Diversity Hiring
            </label>
            <div className="flex justify-end space-x-2">
              <button onClick={handleAddJob} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add Job
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
