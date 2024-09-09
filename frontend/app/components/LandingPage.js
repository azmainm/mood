// components/LandingPage.js
'use client';

import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import LineChart from './LineChart';
import StatsCard from './StatsCard';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 


  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const [moodData, setMoodData] = useState([
    { date: '2024-09-01', moodValue: 3 },
    { date: '2024-09-02', moodValue: 2 }
  ]);

  const [stats, setStats] = useState({
    lastMood: '😀',
    lastDate: '2024-09-02 10:00 AM',
    today: { happy: 3, neutral: 1, sad: 0, angry: 0 },
    allTime: { happy: 50, neutral: 20, sad: 10, angry: 5 },
  });

  const handleEmojiSelect = (emoji) => {
    console.log(`Selected emoji: ${emoji}`);
    // Handle the mood selection logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-black mb-4 text-gray-700">M0O0D</h1>

      <div className='flex flex-col items-center shadow-md border rounded-md p-8'>
      <h2 className="text-xl mb-4 text-gray-800 font-poppins font-semibold">How are you feeling?</h2>

<EmojiPicker onSelect={handleEmojiSelect} />

      </div>
      

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mt-6">
        <LineChart data={moodData} />
        <StatsCard stats={stats} />
      </div>


      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={openLogin}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={openSignUp}
      />
    </div>
  );
};

export default LandingPage;




// This was just for testing
// {/* Add buttons to trigger modals */}
// <div className="mt-6 flex space-x-4">
// <button
//   onClick={openSignUp}
//   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// >
//   Sign Up
// </button>
// <button
//   onClick={openLogin}
//   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// >
//   Log In
// </button>
// </div>
