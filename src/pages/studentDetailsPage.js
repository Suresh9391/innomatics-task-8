// src/pages/StudentDetailsPage.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './studentDetailsPage.css';

const StudentDetailsPage = () => {
    const { id } = useParams();
    const { students } = useContext(StudentContext);
    const student = students.find(student => student.id === parseInt(id));

    if (!student) {
        return <h2 className="text-center mt-5">Student not found</h2>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Student Details</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title className="text-center">{student.name}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {student.email} <br />
                                <strong>Age:</strong> {student.age} <br />
                                <strong>Class:</strong> {student.classRoom} <br />
                                <strong>Address:</strong> {student.address} <br />
                                <strong>Phone Number:</strong> {student.phone} <br />
                            </Card.Text>
                            <div className="text-center">
                                <Button variant="primary" href="/">Back to Student List</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentDetailsPage;
