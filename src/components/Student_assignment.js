import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stu_nav from './Stu_nav';  
import imgJob from '../assets/img9job.jpg';

const StudentAssignment = () => {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

   const handleTakeTest = (assessment) => {
     setCurrentAssessment(assessment);
     setUserAnswers({});
     setSubmitted(false);
   };

   const handleOptionChange = (questionIndex, optionIndex) => {
     setUserAnswers((prevAnswers) => ({
       ...prevAnswers,
       [questionIndex]: optionIndex,
     }));
   };

   const handleSubmit = () => {
     setSubmitted(true);
     setShowSuccessModal(true);
   };

   const closeModal = () => {
     setShowSuccessModal(false);
     setCurrentAssessment(null);
   };

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        backgroundImage: `url(${imgJob})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stu_nav />  

      <div className="container mx-auto p-6 pt-20">
        <h2 className="text-3xl font-semibold mb-6 text-black text-center">Available Assessments</h2>

        {currentAssessment === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="border rounded-lg p-4 shadow-lg bg-gray-800 text-orange-200"
              >
                <h3 className="font-semibold text-lg">{assessment.jobTitle}</h3>
                <button
                  onClick={() => handleTakeTest(assessment)}
                  className="mt-4 bg-lime-200 text-black p-2 rounded-lg hover:bg-blue-600 w-full"
                >
                  Take Test
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-lg text-gray-900">
            <h2 className="text-2xl font-semibold mb-4">
              {currentAssessment.jobTitle} - Test
            </h2>
            <div>
              {currentAssessment.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-6">
                  <p className="font-medium">{question.questionText}</p>
                  <div className="mt-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = userAnswers[questionIndex] === optionIndex;

                      return (
                        <label
                          key={optionIndex}
                          className="block p-2 rounded-md bg-gray-100"
                        >
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            checked={isSelected}
                            onChange={() => handleOptionChange(questionIndex, optionIndex)}
                            disabled={submitted}
                            className="mr-2"
                          />
                          {option.optionText}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Submit Test
            </button>
            <button
              onClick={() => setCurrentAssessment(null)}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 mt-4 ml-4"
            >
              Back to Assessments
            </button>
          </div>
        )}

         
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
              <span className="text-green-500 text-6xl mb-4">✔️</span>
              <h2 className="text-3xl font-semibold mt-4 text-green-600">Test Submitted Successfully!</h2>
              <p className="text-gray-700 mt-2 text-xl">Great job! 😄</p>
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignment;
