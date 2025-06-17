
import React, { useState } from 'react';
import API from '../api';
import { saveTokens } from '../utils/auth';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/token/', { email, password });
      saveTokens(res.data.access, res.data.refresh);
      nav('/dashboard');
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert('Login Failed');
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="login-card p-4 shadow rounded bg-white">
        <h3 className="text-center mb-4 text-primary">Super Admin Login</h3>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
        <p className="text-muted mt-3 small text-center">© 2025 Admin Dashboard</p>
      </div>
    </div>
  );
}

export default Login;

