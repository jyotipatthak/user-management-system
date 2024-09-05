import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/EditUser.css'

type User = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
};

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        const { 
          firstName,
          lastName,
          department,
          email } = response.data;
          setFirstName(firstName);
          setLastName(lastName);
          setDepartment(department);
          setEmail(email);
      } catch (error) {
        alert('Failed to fetch user');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        {
          firstName,
          lastName,
          department,
          email
        }
      );
      alert('User updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
