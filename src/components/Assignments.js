import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Secnav';
import imgJob from '../assets/img9job.jpg';
const AdminAssessments = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);


   
  useEffect(() => {
    // const fetchJobs = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8001/jobs');
    //     setJobs(response.data);
    //   } catch (error) {
    //     console.error('Error fetching jobs:', error);
    //   }
    // };
    // fetchJobs();

    const jobsData = localStorage.getItem("jobs");
    console.log(jobsData);

    if (jobsData) {
      // Parse the string data from localStorage to convert it to an array
      setJobs(JSON.parse(jobsData));
    }


  }, []);

  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
    setQuestions([]);
  };

  const addQuestion = () => {
    if (!currentQuestion || !currentAnswer || !selectedJob) return;

    const formattedOptions = currentOptions.map((optionText) => ({
      optionText,
      isCorrect: optionText === currentAnswer,
    }));

    const newQuestion = {
      questionText: currentQuestion,
      options: formattedOptions,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCurrentAnswer('');
  };

  const saveAssessment = () => {
    if (!selectedJob || questions.length === 0) return;

    try {
      // Find the job ID based on the selected job title
      const selectedJobId = jobs.find((job) => job.title === selectedJob)?.id;

      // Create the assessment object
      const assessment = {
        jobId: selectedJobId,
        jobTitle: selectedJob,
        questions,
        id: generateUniqueId(),
      };

      // Retrieve existing assignments from localStorage (or initialize an empty array)
      const assignmentsData = localStorage.getItem("assignments");
      const assignments = assignmentsData ? JSON.parse(assignmentsData) : [];

      // Add the new assessment to the assignments array
      const updatedAssignments = [...assignments, assessment];

      // Save the updated assignments back to localStorage
      localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

      // Show success modal
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      // Reset the selected job and questions
      setSelectedJob("");
      setQuestions([]);
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };


  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center bg-fixed"
    style={{
      backgroundImage: `url(${imgJob})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(1.1)',
    }}
  >
  
      <Navbar />
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="mt-16 container mx-auto p-8 max-w-2xl h-[90vh] bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl overflow-y-auto">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center">Create Job-Specific Assessment</h2>

          <label className="block text-lg font-medium mb-2 text-gray-200">Select Job:</label>
          <select
            className="border p-3 rounded-md w-full mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedJob}
            onChange={handleJobChange}
          >
            <option value="">Select a job</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title}
              </option>
            ))}
          </select>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-200">Question:</label>
            <input
              type="text"
              className="border p-3 rounded-md w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-200">Options:</label>
            {currentOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                className="border p-3 rounded-md w-full mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...currentOptions];
                  newOptions[index] = e.target.value;
                  setCurrentOptions(newOptions);
                }}
              />
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-200">Correct Answer:</label>
            <input
              type="text"
              className="border p-3 rounded-md w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
            />
          </div>

          <button
            onClick={addQuestion}
            className="bg-blue-600 text-white p-3 rounded-md mb-6 w-full hover:bg-blue-700 transition duration-300"
          >
            Add Question
          </button>

          <h3 className="text-2xl font-semibold text-white mb-4">Questions for {selectedJob}</h3>
          <ul className="mb-6 text-gray-300">
            {questions.map((q, index) => (
              <li key={index} className="border-b py-3">
                <strong>Q{index + 1}:</strong> {q.questionText}
                <ul className="pl-6 mt-2">
                  {q.options.map((option, idx) => (
                    <li key={idx} className="text-gray-200">
                      Option {idx + 1}: {option.optionText}{' '}
                      {option.isCorrect && <span className="text-green-500">(Correct)</span>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button
            onClick={saveAssessment}
            className="bg-green-600 text-white p-3 rounded-md w-full hover:bg-green-700 transition duration-300"
          >
            Save Assessment
          </button>

          {showSuccessModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                <span className="text-green-500 text-3xl">✔️</span>
                <p className="text-lg font-semibold text-green-500">Assessment saved successfully!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAssessments;
