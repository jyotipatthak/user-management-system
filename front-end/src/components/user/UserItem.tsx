import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/UserItem.css';


type User = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
};

const UserItem: React.FC<{ user: User }> = ({ user }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user.id}`);
      alert('User deleted successfully!');
      window.location.reload(); // Reload the page to update the user list
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="user-item">
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
      <p><b>Department</b>: {user.department}</p>
        <Link to={`/edit/${user.id}`} className="user-item-button">Edit</Link>
        <button onClick={handleDelete} className="user-item-button">Delete</button>
    </div>
  );
};

export default UserItem;
