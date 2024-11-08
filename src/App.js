import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import JobPostings from './components/Job_postings'
import Assignments from './components/Assignments';
import Student_profile from './components/Student_profile';
import Job_update from './components/Job_update';
import Track from './components/Track';
import Student_assignment from './components/Student_assignment'
import Manage_assign from './components/Manage_assign';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/job-postings" element={<JobPostings/> } />
                <Route path="/job-postings/:id" element={<Job_update/> } />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/profiles" element={<Student_profile/>} />
                <Route path="/track" element={<Track/>} />
                <Route path="/assessment" element={<Student_assignment/>} />
                <Route path="/manage-assignment" element={<Manage_assign/>} />
            </Routes>
        </Router>
    );
}

export default App;
