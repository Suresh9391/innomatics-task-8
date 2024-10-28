// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css'; // Custom CSS for the Navbar

const NavigationBar = () => {
    return (
        <Navbar bg="info" expand="lg">
            <Navbar.Brand as={Link} to="/" id="student">Student Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" id="student">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/students" id="student">Student List</Nav.Link>
                    <Nav.Link as={Link} to="/register" id="student">Register Student</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
