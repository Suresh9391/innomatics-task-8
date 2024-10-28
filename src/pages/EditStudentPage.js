// src/pages/EditStudentPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import { StudentContext } from '../context/StudentContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './EditStudentPage.css';

const EditStudentPage = () => {
    const { id } = useParams();
    const { students, updateStudent } = useContext(StudentContext);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const student = students.find(student => student.id === parseInt(id));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        classRoom: '',
        address: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                email: student.email,
                age: student.age,
                classRoom: student.classRoom,
                address: student.address,
                phone: student.phone,
            });
        }else {
            setErrors({ general: 'Student not found' });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: '' }); // Clear error for that field
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.classRoom) newErrors.classRoom = 'Class is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            updateStudent({ ...student, ...formData });
            setSuccessMessage('Student information updated successfully!');
            setTimeout(() => {
                navigate('/'); // Redirect to student list after saving
            }, 2000);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Edit Student Information</h1>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student's name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter student's email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter student's age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                isInvalid={!!errors.age}
                            />
                            <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student's class"
                                name="classRoom"
                                value={formData.classRoom}
                                onChange={handleChange}
                                isInvalid={!!errors.classRoom}
                            />
                            <Form.Control.Feedback type="invalid">{errors.classRoom}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student's address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student's phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditStudentPage;
