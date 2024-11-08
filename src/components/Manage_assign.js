import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Secnav';
import imgJob from '../assets/img9job.jpg'; // Update with the path to your image

const ManageAssign = () => {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const fetchAssessments = () => {
   try {
     // Retrieve assessments from localStorage
     const assessmentsData = localStorage.getItem("assignments");

     // If data exists, parse it and set it to state
     if (assessmentsData) {
       setAssessments(JSON.parse(assessmentsData));
     } else {
       // If no data is found in localStorage, initialize with an empty array
       setAssessments([]);
     }
   } catch (error) {
     console.error("Error fetching assessments from localStorage:", error);
   }
 };

 // Call fetchAssessments when the component mounts
 useEffect(() => {
   fetchAssessments();
 }, []);


 const handleDeleteAssessment = (assessmentId) => {
   try {
     // Retrieve the current assessments from localStorage
     const assessmentsData = localStorage.getItem("assignments");

     if (assessmentsData) {
       // Parse the data
       const assessmentsArray = JSON.parse(assessmentsData);

       // Filter out the assessment to delete
       const updatedAssessments = assessmentsArray.filter(
         (assessment) => assessment.id !== assessmentId
       );

       // Update the localStorage with the new list of assessments
       localStorage.setItem("assignments", JSON.stringify(updatedAssessments));

       // Update the state with the filtered assessments
       setAssessments(updatedAssessments);
     }
   } catch (error) {
     console.error("Error deleting assessment from localStorage:", error);
   }
 };


  const handleEditAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setIsModalOpen(true);  
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentAssessment(null);
  };

 const handleSaveChanges = () => {
   try {
     // Retrieve the current assignments from localStorage
     const assignmentsData = localStorage.getItem("assignments");

     if (assignmentsData) {
       // Parse the assignments from localStorage
       const assignmentsArray = JSON.parse(assignmentsData);

       // Update the current assessment in the array
       const updatedAssignments = assignmentsArray.map((a) =>
         a.id === currentAssessment.id ? currentAssessment : a
       );

       // Save the updated assignments back to localStorage
       localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

       // Update the state with the updated list of assignments
       setAssessments(updatedAssignments);

       // Close the modal
       handleModalClose();
     }
   } catch (error) {
     console.error("Error saving changes to localStorage:", error);
   }
 };

 const handleQuestionChange = (questionIndex, value) => {
   const updatedAssessment = { ...currentAssessment };
   updatedAssessment.questions[questionIndex].questionText = value;
   setCurrentAssessment(updatedAssessment);

   // No need to save to localStorage here
 };

 const handleOptionChange = (questionIndex, optionIndex, value) => {
   const updatedAssessment = { ...currentAssessment };
   updatedAssessment.questions[questionIndex].options[optionIndex].optionText =
     value;
   setCurrentAssessment(updatedAssessment);

   // No need to save to localStorage here
 };


  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${imgJob})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.1)',   
      }}
    >
      <Navbar className="fixed top-0 w-full z-10 bg-blue-600 shadow-lg" />
      <div className="pt-20 p-4">
        <h2 className="text-black text-2xl font-semibold mb-4">Manage Assessments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="border border-gray-800 rounded-lg p-4 shadow-lg bg-gray-800 transition-shadow duration-300 hover:shadow-[rgba(0,_0,_0,_0.56)_0px_22px_70px_4px]"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
              }}
            >
              <h3 className="font-semibold text-lg">{assessment.jobTitle}</h3>
              <button
                onClick={() => handleEditAssessment(assessment)}
                className="mt-4 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAssessment(assessment.id)}
                className="ml-4 mt-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && currentAssessment && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Edit {currentAssessment.jobTitle}</h3>
              <div>
                {currentAssessment.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-6">
                    <input
                      type="text"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                      className="w-full p-2 mb-2 border rounded text-black"
                      placeholder="Enter question text"
                    />
                    <div className="ml-4">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2 flex items-center">
                          <input
                            type="text"
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            className="p-2 border rounded w-full text-black"
                            placeholder="Enter option text"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAssign;
