import React, { useState } from 'react';
import Modal from './Modal';

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Reset error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://95a5-103-220-204-29.ngrok-free.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User signed up:", result);
        setSuccessMessage('Sign up successful!');  // Display success message
        setFormData({ name: '', email: '', username: '', password: '' }); // Reset form
        setTimeout(() => onSignUpSuccess(), 2000); // Switch to login modal after delay
      } else {
        const error = await response.json();
        setError(error.detail || "Signup failed! Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-sm hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
      
      {/* Error message */}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {/* Success message */}
      {successMessage && <p className="mt-4 text-center text-green-600">{successMessage}</p>}

      <p className="mt-4 text-center">
        Already a member?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-900 hover:underline">
          Login
        </button>
      </p>
    </Modal>
  );
};

export default SignUpModal;
