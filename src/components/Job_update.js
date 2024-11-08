import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobUpdate = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // axios.get('http://localhost:8001/jobs')
    //   .then(response => {
    //     const jobData = response.data.find(job => job.id === jobId);
    //     if (jobData) {
    //       setJob(jobData);
    //       setError(null);
    //     } else {
    //       setError("Job not found. It may have been deleted.");
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error fetching job details:", error);
    //     setError("An error occurred while fetching the job details.");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

   const jobsData = localStorage.getItem("jobs");
   console.log(jobsData);

   if (jobsData) {
     // Parse jobsData to convert it from JSON string to array
     const jobsArray = JSON.parse(jobsData);

     // Now you can use the array to find the specific job
     const jobData = jobsArray.find((job) => job.id === jobId);

     if (jobData) {
       setJob(jobData); // Set the found job data
       setError(null);

       setIsLoading(false);
     } else {
       setError("Job not found. It may have been deleted.");
     }
   } else {
     setError("No job postings available.");
    }
    


  }, [jobId]);

 const handleUpdate = () => {
   // Retrieve jobs from localStorage
   const jobsData = localStorage.getItem("jobs");

   if (jobsData) {
     // Parse jobsData to convert it from JSON string to array
     const jobsArray = JSON.parse(jobsData);

     // Find the index of the job to update
     const jobIndex = jobsArray.findIndex((j) => j.id === job.id);

     if (jobIndex !== -1) {
       // Update the job data at the found index
       jobsArray[jobIndex] = job;

       // Save the updated jobs array back to localStorage
       localStorage.setItem("jobs", JSON.stringify(jobsArray));

       // Update the state to reflect the changes in the UI
       setJob(job);
       setIsEditing(false);
       setError(null);
     } else {
       setError("Job not found. It may have been deleted.");
     }
   } else {
     setError("No job postings available.");
   }
 };


  const handleDelete = () => {
    // Retrieve jobs from localStorage
    const jobsData = localStorage.getItem("jobs");

    if (jobsData) {
      // Parse jobsData to convert it from JSON string to array
      const jobsArray = JSON.parse(jobsData);

      // Filter out the job with the matching ID
      const updatedJobsArray = jobsArray.filter((j) => j.id !== jobId);

      // Save the updated jobs array back to localStorage
      localStorage.setItem("jobs", JSON.stringify(updatedJobsArray));

      // Navigate back to job postings page
      navigate("/job-postings");
      setError(null);
    } else {
      setError("No job postings available.");
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob({
      ...job,
      [name]: type === 'checkbox' ? checked : value,  
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 flex justify-center items-center pt-12 pb-12">
      <div className="p-8 bg-gray-700 shadow-2xl rounded-lg max-w-3xl w-full h-auto transition-all duration-300 hover:shadow-2xl transform hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 text-white">Job Details</h2>
        <div className="space-y-3">
          {isEditing ? (
            Object.keys(job).map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-white font-semibold">{formatKey(key)}:</label>
                {typeof job[key] === "boolean" ? (
                  <input
                    type="checkbox"
                    name={key}
                    checked={job[key]}
                    onChange={handleInputChange}
                    className="ml-2"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={job[key] || ''}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-500 rounded w-full bg-gray-800 text-white"
                  />
                )}
              </div>
            ))
          ) : (
            Object.keys(job).map((key) => (
              <p key={key} className="text-lg">
                <strong className="text-purple-300">{formatKey(key)}:</strong> 
                <span className="text-gray-200 ml-2">{typeof job[key] === "boolean" ? (job[key] ? 'Yes' : 'No') : job[key]}</span>
              </p>
            ))
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Update
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/job-postings")}
            className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobUpdate;
