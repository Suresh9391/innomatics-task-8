// src/context/StudentContext.js
import React, { createContext, useState, useEffect } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);

    // Fetch data from public/studentData.json
    useEffect(() => {
        fetch('/student.json')
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error("Error fetching student data:", error));
    }, []);

    const updateStudent = (updatedStudent) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === updatedStudent.id ? updatedStudent : student
            )
        );
    };

    const deleteStudent = (id) => {
        setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
    };

    return (
        <StudentContext.Provider value={{ students, updateStudent, deleteStudent, setStudents }}>
            {children}
        </StudentContext.Provider>
    );
};
