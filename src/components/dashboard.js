import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import '../styles/dashboard.css';


import UserPanel from './UserPanel';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('users/').then(res => setUsers(res.data))
      .catch(() => nav('/'));
  }, [nav]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h3>Admin Dashboard</h3>
        <div className="table-responsive border rounded shadow-sm bg-white p-3 mb-4">
          <table className="table table-striped">
            <thead className="table-secondary">
              <tr><th>User</th><th>Email</th><th>Role</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}><td>{u.username}</td><td>{u.email}</td><td>{u.is_superadmin ? 'Admin' : 'User'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <UserPanel />
      </div>
    </div>
  );
}
