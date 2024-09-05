import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserList from './components/user/UserList';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';

const App = () => {

  return (
    <Router>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <Link to="/" style={styles.navLink}>User Management System</Link>
        </div>
        <div style={styles.navRight}>
          <Link to="/" style={styles.addTaskButton}>User Lists</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically center items
    padding: '15px', // Increased padding for more height
    backgroundColor: '#28a745',
    borderBottom: '1px solid #ddd',
  },
  navLeft: {
    flex: 1,
  },
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center', // Vertically center items
  },
  navLink: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#fff',
  },
  addTaskButton: {
    margin: '0 10px',
    padding: '8px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textDecoration: 'none', // Remove underline from link
  },
  logoutButton: {
    margin: '0 10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default App;
