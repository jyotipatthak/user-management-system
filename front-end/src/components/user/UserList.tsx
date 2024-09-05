import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import './css/UserList.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link for navigation

type User = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  email: string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5); // Set how many users per page (limit)

  // Fetch users based on the current page
  const fetchUsers = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users?page=${page}&limit=${limit}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };
  
  const fetchDefaultUsers = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
        type ApiResponse = {
          id: number;
          name: string;
          email: string;
        };

        const data:User[] = response.data.map((res: ApiResponse, index:number)=>{
          return {
            id: res?.id,
            firstName: res?.name,
            lastName: res?.name,
            department: "Public",
            email: res?.email,
          }
        });
        console.log(data);
        setUsers(data);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    // fetchDefaultUsers();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
      <h1>Users</h1>
      <Link to="/add" className="add-user-button">Add User</Link>
      </div>
      <div className="user-item-container">
        {users.map((user) => (
            <UserItem user={user}  key={user.id}/>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
