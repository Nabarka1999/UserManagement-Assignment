import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', username: '', company: { name: '' } });
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

  // Simulate Add User
  const addUser = () => {
    const fakeUser = { id: users.length + 1, ...newUser };
    setUsers((prev) => [...prev, fakeUser]);
    setNewUser({ name: '', email: '', username: '', company: { name: '' } });
    setIsModalOpen(false);
  };

  // Simulate Edit User
  const editUser = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setEditingUser(null);
    setIsModalOpen(false);
  };

  // Simulate Delete User
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
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
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.company?.name}</td>
              <td>
                <button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="btn-edit">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="btn-delete">Delete</button>
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

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editingUser ? editingUser.name : newUser.name}
              onChange={handleInputChange}
            />

            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={editingUser ? editingUser.username : newUser.username}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={handleInputChange}
            />

            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={editingUser ? editingUser.company.name : newUser.company.name}
              onChange={(e) =>
                editingUser
                  ? setEditingUser((prev) => ({ ...prev, company: { name: e.target.value } }))
                  : setNewUser((prev) => ({ ...prev, company: { name: e.target.value } }))
              }
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

