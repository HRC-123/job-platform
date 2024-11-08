import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stu_nav from './Stu_nav';
import imgJob from '../assets/img9job.jpg';

const StudentProfile = () => {
 const [jobs, setJobs] = useState([]);
 const [error, setError] = useState("");
 const [showApplyForm, setShowApplyForm] = useState(false);
 const [showViewModal, setShowViewModal] = useState(false);
 const [selectedJob, setSelectedJob] = useState(null);
 const [viewJob, setViewJob] = useState(null);
 const [applicationDetails, setApplicationDetails] = useState({
   name: "",
   email: "",
   resumeUrl: "",
 });
 const [appliedJobs, setAppliedJobs] = useState([]);

 // Fetch jobs from localStorage or set to an empty array if not found
 const fetchJobs = () => {
   try {
     const jobsData = localStorage.getItem("jobs");
     if (jobsData) {
       setJobs(JSON.parse(jobsData));
     } else {
       setJobs([]);
     }
   } catch (error) {
     setError("Could not load jobs from localStorage.");
   }
 };

 // Set applied jobs from localStorage
 const fetchAppliedJobs = () => {
   try {
     const appliedJobsData = localStorage.getItem("appliedJobs");
     if (appliedJobsData) {
       setAppliedJobs(JSON.parse(appliedJobsData));
     } else {
       setAppliedJobs([]);
     }
   } catch (error) {
     setError("Could not load applied jobs from localStorage.");
   }
 };

 useEffect(() => {
   fetchJobs();
   fetchAppliedJobs();
 }, []);

 // Handle input change for the application form
 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setApplicationDetails({ ...applicationDetails, [name]: value });

   // Store application details in localStorage
   localStorage.setItem(
     "applicationDetails",
     JSON.stringify(applicationDetails)
   );
 };

 // Handle applying for a job
 const handleApplySubmit = (e) => {
   e.preventDefault();
   try {
     const newAppliedJobs = [...appliedJobs, selectedJob];

     // Save applied job to localStorage
     localStorage.setItem("appliedJobs", JSON.stringify(newAppliedJobs));

     setAppliedJobs(newAppliedJobs);
     setShowApplyForm(false);
     setApplicationDetails({ name: "", email: "", resumeUrl: "" });

     // Optionally clear application form in localStorage
     localStorage.removeItem("applicationDetails");
   } catch (error) {
     setError("Error submitting the application. Please try again.");
   }
 };

 // Handle showing apply form
 const handleApplyClick = (job) => {
   setSelectedJob(job);
   setShowApplyForm(true);
 };

 // Close the application form
 const handleCloseForm = () => {
   setShowApplyForm(false);
 };

 // Handle showing the view modal
 const handleViewClick = (job) => {
   setViewJob(job);
   setShowViewModal(true);
 };

 // Close the view modal
 const handleCloseViewModal = () => {
   setShowViewModal(false);
   setViewJob(null);
 };

 // Initialize applied jobs from localStorage on mount
 useEffect(() => {
   const storedAppliedJobs = localStorage.getItem("appliedJobs");
   if (storedAppliedJobs) {
     setAppliedJobs(JSON.parse(storedAppliedJobs));
   }
 }, []);


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
      <Stu_nav />
      
      <div className="container mx-auto p-4 pt-20">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className={`p-4 border rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl ${
                  appliedJobs.includes(job) ? 'bg-green-100' : 'bg-gray-800'
                }`}
              >
                <h3 className="text-xl text-neutral-100 font-semibold">{job.title}</h3>
                <p className="text-amber-200">{job.description}</p>
                <p className="text-sm text-lime-200">{job.location}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {appliedJobs.includes(job) ? 'Applied' : 'Apply'}
                  </button>
                  <button
                    onClick={() => handleViewClick(job)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available at the moment.</p>
          )}
        </div>

        {showApplyForm && selectedJob && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Apply for {selectedJob.title}</h2>
              <form onSubmit={handleApplySubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={applicationDetails.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationDetails.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Resume URL</label>
                  <input
                    type="text"
                    name="resumeUrl"
                    value={applicationDetails.resumeUrl}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border-neutral-600 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

 {showViewModal && viewJob && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">{viewJob.title}</h2>
              <p className="mb-2"><strong>Description:</strong> {viewJob.description}</p>
              <p className="mb-2"><strong>Location:</strong> {viewJob.location}</p>
              <p className="mb-2"><strong>Skills Required:</strong> {viewJob.skillsRequired}</p>
              <p className="mb-2"><strong>Hiring Type:</strong> {viewJob.hiringType}</p>
              <p className="mb-2"><strong>Number of Posts:</strong> {viewJob.numberOfPosts}</p>
              <p className="mb-2"><strong>Candidates Applied:</strong> {viewJob.candidatesApplied}</p>
              <p className="mb-4"><strong>Diversity Hiring:</strong> {viewJob.diversityHiring ? 'Yes' : 'No'}</p>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseViewModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
