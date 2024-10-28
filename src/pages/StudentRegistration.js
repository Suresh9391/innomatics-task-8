import React, { useState } from "react";
import './StudentRegistration.css';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    studentClass: "",
    address: "",
    phone: "",
  });

  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.age || isNaN(formData.age) || formData.age < 1)
      newErrors.age = "Valid age is required";
    if (!formData.studentClass) newErrors.studentClass = "Class is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setStudents([...students, formData]);
      setFormData({ name: "", email: "", age: "", studentClass: "", address: "", phone: "" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register New Student</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Class</label>
          <input
            type="text"
            name="studentClass"
            className={`form-control ${errors.studentClass ? "is-invalid" : ""}`}
            value={formData.studentClass}
            onChange={handleChange}
          />
          {errors.studentClass && <div className="invalid-feedback">{errors.studentClass}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Register Student</button>
      </form>

      <h3 className="text-center mt-5">Registered Students</h3>
      <table className="table table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Class</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.studentClass}</td>
              <td>{student.address}</td>
              <td>{student.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRegistration;
