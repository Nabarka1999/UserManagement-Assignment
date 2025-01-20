import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Add User
  const addUser = async () => {
    try {
      await axios.post(apiUrl, newUser);
      fetchUsers();
      setNewUser({ firstName: '', lastName: '', email: '', department: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Edit User
  const editUser = async () => {
    try {
      await axios.put(`${apiUrl}/${editingUser.userid}`, editingUser);
      fetchUsers();
      setEditingUser(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  // Delete User
  const deleteUser = async (userid) => {
    try {
      await axios.delete(`${apiUrl}/${userid}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Management</h1>

      <button onClick={() => setIsModalOpen(true)} className="btn-add">
        Add User
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="btn-edit">Edit</button>
                <button onClick={() => deleteUser(user.userid)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="btn-pagination">
            Previous
          </button>
        )}
        {currentUsers.length === usersPerPage && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="btn-pagination">
            Next
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>

            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={editingUser ? editingUser.firstName : newUser.firstName}
              onChange={handleInputChange}
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={editingUser ? editingUser.lastName : newUser.lastName}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={handleInputChange}
            />

            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={editingUser ? editingUser.department : newUser.department}
              onChange={handleInputChange}
            />

            <button onClick={editingUser ? editUser : addUser} className="btn-save">
              {editingUser ? 'Save Changes' : 'Add User'}
            </button>
            <button onClick={() => setIsModalOpen(false)} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
