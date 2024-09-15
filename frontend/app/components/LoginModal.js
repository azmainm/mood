// components/LoginModal.js
import React, { useState } from 'react';
import Modal from './Modal';

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: formData.username,
        password: formData.password,
      }),
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log("User logged in:", result);
      localStorage.setItem('token', result.access_token);  // Store the JWT token
      localStorage.setItem('username', result.username);   // Store the username
      onClose();  // Close the modal on success
      // Trigger login success, pass username
      onLoginSuccess(result.username);  
    } else {
      setErrorMessage("Login failed. Please check your credentials.");
      console.error("Login failed");
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
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
