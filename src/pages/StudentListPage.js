import React, { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';
import { Table, InputGroup, FormControl, Dropdown, DropdownButton, Button, Pagination, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './studentListPage.css';

const StudentListPage = () => {
    const { students, deleteStudent } = useContext(StudentContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [sortOrder, setSortOrder] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;
    const navigate = useNavigate(); // For navigation to the EditStudentPage

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleClassFilterChange = (className) => { setSelectedClass(className); setCurrentPage(1); };
    const handleSortChange = (order) => setSortOrder(order);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedClass ? student.classRoom === selectedClass : true)
    );

    const sortedStudents = filteredStudents.sort((a, b) => {
        if (sortOrder === 'name') {
            return (a.name || '').localeCompare(b.name || '');
        } else {
            return (a.classRoom || '').localeCompare(b.classRoom || '');
        }
    });
    

    const totalStudents = sortedStudents.length;
    const totalPages = Math.ceil(totalStudents / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const currentStudents = sortedStudents.slice(startIndex, startIndex + studentsPerPage);

    return (
        <div className="student-list-container">
            <h1 className="text-center mb-4">Student List</h1>
            <Row className="mb-3">
                <Col md={4}>
                    <InputGroup>
                        <FormControl
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <DropdownButton
                        variant="secondary"
                        title={selectedClass || "Filter by Class"}
                        className="w-100"
                        onSelect={handleClassFilterChange}
                    >
                        <Dropdown.Item eventKey="">All Classes</Dropdown.Item>
                        <Dropdown.Item eventKey="10th Grade">10th Grade</Dropdown.Item>
                        <Dropdown.Item eventKey="11th Grade">11th Grade</Dropdown.Item>
                        <Dropdown.Item eventKey="12th Grade">12th Grade</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col md={4}>
                    <DropdownButton
                        variant="secondary"
                        title={`Sort by: ${sortOrder === 'name' ? 'Name' : 'Class'}`}
                        className="w-100"
                        onSelect={handleSortChange}
                    >
                        <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                        <Dropdown.Item eventKey="class">Class</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.classRoom}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
                                            deleteStudent(student.id);
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="primary"
                                    className="ml-2"
                                    onClick={() => navigate(`/edit-student/${student.id}`)}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default StudentListPage;
