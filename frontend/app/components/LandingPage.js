'use client';
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import EmojiPicker from './EmojiPicker';
import LineChart from './LineChart';
import StatsCard from './StatsCard';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import MoodSavedModal from './MoodSavedModal';
import axios from 'axios';

const emojiToMoodValue = {
  "😀": 3,  // Happy
  "😐": 1,  // Neutral
  "😢": -1, // Sad
  "😡": -2, // Angry
};

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true); // Login modal opens by default
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // Store user's name
  const [moodDataChart, setMoodDataChart] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSavedModalOpen, setMoodSavedModalOpen] = useState(false); // Modal state
  const [moodTimestamp, setMoodTimestamp] = useState(null);
  // const [isLoading, setIsLoading] = useState(false); // Manage loading state
  // const [stats, setStats] = useState(null);  
  // const [error, setError] = useState(null); 
  // const [moodData, setMoodData] = useState(null);  

  useEffect(() => {
    // const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');


    // if (storedToken && storedUsername) {
      if (storedUsername) {
      setIsLoggedIn(true);
      setUserName(storedUsername);  // Retrieve username from localStorage
      // Fetch mood data for the last 7 days
      axios.get(' https://fea5-103-220-204-28.ngrok-free.app/moods/last7days', {
        // headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        const moodEntries = response.data.map(entry => ({
          date: entry.date,
          moodValue: emojiToMoodValue[entry.emoji]
        }));
        setMoodDataChart(moodEntries);  // Update state with mood data
      })
      .catch((error) => {
        console.error("Error fetching mood data", error);
        setError("Could not load mood data.");
      });
    }
  }, []);
  
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
    // localStorage.removeItem('token');
    localStorage.removeItem('username');
    setTimeout(() => {
      setIsLoginOpen(true);  // Reopen login modal after a slight delay
    }, 300);  // A brief delay to prevent the button from vanishing abruptly
  };

  
  // Handle emoji selection from EmojiPicker
  const handleEmojiSelect = (emoji) => {
    console.log(`Selected emoji: ${emoji}`);
    // This will also save the emoji to the database via EmojiPicker component
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    setSelectedMood(emoji);
    setMoodTimestamp(timestamp);
    setMoodSavedModalOpen(true); // Open the modal
  };

// Function to fetch updated stats
// const fetchUpdatedStats = async () => {
//   try {
//     const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//     const response = await axios.get('http://localhost:8000/stats', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setStats(response.data); // Update stats state with new data
//   } catch (error) {
//     console.error("Error fetching stats:", error);
//     setError("Error fetching updated stats.");
//   }
// };

// // Function to fetch updated mood data for the chart
// const fetchUpdatedMoodData = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get('http://localhost:8000/moods', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setMoodData(response.data); // Update mood data state with new data
//   } catch (error) {
//     console.error("Error fetching mood data:", error);
//     setError("Error fetching updated mood data.");
//   }
// };

// // // Handle emoji selection and save mood
// // const [isLoading, setIsLoading] = useState(false); // Manage loading state

// // Modify handleEmojiSelect function to use loading state
// const handleEmojiSelect = async (emoji) => {
//   setIsLoading(true); // Show loading

//   try {
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:8000/mood', { emoji: emoji }, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     await fetchUpdatedStats();  // Fetch latest stats
//     await fetchUpdatedMoodData();  // Fetch latest chart data
//   } catch (error) {
//     console.error("Error saving mood:", error);
//     setError("Error saving mood.");
//   } finally {
//     setIsLoading(false);  // Hide loading once done
//   }
// };


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

      {/* <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mt-6">
        
        
      </div> */}
      <LineChart data={moodDataChart} />
      <StatsCard key={userName} />
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

      {/* Mood Saved Modal */}
      <MoodSavedModal
        isOpen={moodSavedModalOpen}
        mood={selectedMood}
        timestamp={moodTimestamp}
        onClose={() => setMoodSavedModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
