import React, { useState } from 'react';
import axios from 'axios';
import './css/AddUser.css'
import axiosInstance from '../../network';

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        'http://localhost:5000/api/users',
        {
          firstName,
          lastName,
          department,
          email
        }
      );
      alert('User added successfully!');
    } catch (error) {
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
        <h2>Add User</h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="department"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
