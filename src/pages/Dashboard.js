// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const { students } = useContext(StudentContext);

    // Calculate the number of students per class
    const classCounts = students.reduce((acc, student) => {
        acc[student.classRoom] = (acc[student.classRoom] || 0) + 1;
        return acc;
    }, {});

    const classData = Object.keys(classCounts).map((key) => ({
        name: key,
        value: classCounts[key],
    }));

    return (
        <Container className="mt-5 bg-success" id="dashboard">
            <h1 className="text-center mb-4 ">Dashboard</h1>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="text-center border border-primary rounded">
                        <Card.Body>
                            <Card.Title className="text-primary">Total Students</Card.Title>
                            <Card.Text className="display-4 text-info">
                                {students.length}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="text-center border border-primary rounded">
                        <Card.Body>
                            <Card.Title className="text-primary">Students per Class</Card.Title>
                            <PieChart width={200} height={200} className="mx-auto">
                                <Pie
                                    data={classData}
                                    cx={100}
                                    cy={100}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {classData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
