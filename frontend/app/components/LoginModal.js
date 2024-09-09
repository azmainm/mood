// components/LoginModal.js
import React, { useState } from 'react';
import Modal from './Modal';

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Handle login logic here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-sm hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Not a member?{' '}
        <button
          onClick={onSwitchToSignUp}
          className="text-blue-900 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </Modal>
  );
};

export default LoginModal;
