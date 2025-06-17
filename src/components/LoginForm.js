import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="mb-3">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
