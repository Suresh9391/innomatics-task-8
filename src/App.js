// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import StudentListPage from './pages/StudentListPage';
import StudentRegistration from './pages/StudentRegistration';
import studentDetailsPage from './pages/studentDetailsPage';
import EditStudentPage from './pages/EditStudentPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import './App.css'; // Global styles for the application
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <StudentProvider>
            <Router>
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/students" element={<StudentListPage />} />
                        <Route path="/register" element={<StudentRegistration />} />
                        <Route path="/students/:id" element={<studentDetailsPage />} />
                        <Route path="/edit-student/:id" element={<EditStudentPage />} />
                    </Routes>
                </div>
            </Router>
        </StudentProvider>
    );
};

export default App;

