'use client';
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import EmojiPicker from './EmojiPicker';
import LineChart from './LineChart';
import StatsCard from './StatsCard';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import axios from 'axios';

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true); // Login modal opens by default
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // Store user's name
  const [moodData, setMoodData] = useState([]); // Real mood data
  const [stats, setStats] = useState({
    lastMood: '',
    lastDate: '',
    today: { "😀": 0, "😐": 0, "😢": 0, "😡": 0 },
    allTime: { "😀": 0, "😐": 0, "😢": 0, "😡": 0 }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
  
    if (storedToken && storedUsername) {
      setIsLoggedIn(true);
      setUserName(storedUsername);  // Retrieve username from localStorage

      // // Fetch mood data and stats
      // fetchData(storedToken);
    }
  }, []);

  // Function to fetch mood data and stats from the backend
  // const fetchData = async (token) => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/stats', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     // // Assume response.data has a mood history array and stats
  //     // const { moodHistory, lastMood, lastDate, today, allTime } = response.data;

  //     // // Update state with the real data
  //     // setMoodData(moodHistory); // Array for LineChart
  //     setStats({ lastMood, lastDate, today, allTime }); // Stats for StatsCard
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError('Failed to load data.');
  //   }
  // };

  // Function to open the Sign-Up modal and close Login modal
  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  // Function to open the Login modal and close Sign-Up modal
  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
  };

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUserName(username);  // Store the logged-in username
    setIsLoginOpen(false);  // Close the login modal after successful login
  };

  // Function to handle successful sign-up
  const handleSignUpSuccess = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true); // Ensure login modal opens after sign-up
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);  // Log out user
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setTimeout(() => {
      setIsLoginOpen(true);  // Reopen login modal after a slight delay
    }, 300);  // A brief delay to prevent the button from vanishing abruptly
  };

  // Handle emoji selection from EmojiPicker
  const handleEmojiSelect = (emoji) => {
    console.log(`Selected emoji: ${emoji}`);
    // This will also save the emoji to the database via EmojiPicker component
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-10 flex flex-col items-center">
      <h1 className="text-4xl font-black mb-8 text-gray-700">
        M0<span className="line-through text-blue-400">O</span>0D
      </h1>

      {/* Display user name if logged in */}
      <div className="flex flex-col items-center shadow-md border rounded-md p-8 mb-12">
        <h2 className="text-xl mb-4 text-gray-800 font-poppins font-semibold">
          Hi <span className='text-blue-500'>{isLoggedIn ? userName : 'Guest'}</span>, how are you feeling?
        </h2>
        <EmojiPicker onSelect={handleEmojiSelect} />
      </div>

      <h1 className="text-2xl font-black mb-4 bg-gray-900 w-full text-center py-6 text-gray-200">
        Dashb<span className="underline text-blue-400">o</span>ard
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mt-6">
        <LineChart data={moodData} />
        <StatsCard key={userName} />
      </div>

      {/* Render sign-out button if logged in */}
      {isLoggedIn && (
        <FaSignOutAlt
          className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl hover:scale-125 transition ease-in-out duration-300 mt-8"
          onClick={handleLogout}
        />
      )}

      <p className="text-sm mt-6 text-gray-500">Developed by Azmain Morshed</p>

      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={openLogin}
        onSignUpSuccess={handleSignUpSuccess} // Trigger login modal on successful sign-up
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={openSignUp}
        onLoginSuccess={handleLoginSuccess} // Handle successful login
      />
    </div>
  );
};

export default LandingPage;
