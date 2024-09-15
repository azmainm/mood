// components/StatsCard.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const StatsCard = () => {
  const [stats, setStats] = useState({
    lastMood: '',
    lastDate: '',
    today: { happy: 0, neutral: 0, sad: 0, angry: 0 },
    allTime: { happy: 0, neutral: 0, sad: 0, angry: 0 }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User token is missing.');
          return;
        }

        // Fetch user stats from the backend
        const response = await axios.get('http://localhost:8000/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Update state with received data
        const { last_mood, last_date, today, all_time } = response.data;
        setStats({
          lastMood: last_mood,
          lastDate: last_date,
          today,
          allTime
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load statistics.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full md:w-3/5 bg-gray-50 shadow-md rounded-md p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Statistics</h2>

      {/* Last Logged Mood */}
      <div className="mb-4">
        <strong className="text-gray-800 font-semibold">Last Logged Mood:</strong> {stats.lastMood} on {stats.lastDate}
      </div>

      {/* Moods Today */}
      <div className="mb-4">
        <strong className="text-gray-800 font-semibold">Moods Today:</strong> 😀 {stats.today.happy}, 😐 {stats.today.neutral}, 😢 {stats.today.sad}, 😡 {stats.today.angry}
      </div>

      {/* All-Time Moods */}
      <div className="mb-2">
        <strong className="text-gray-800 font-semibold">All-Time Moods:</strong> 😀 {stats.allTime.happy}, 😐 {stats.allTime.neutral}, 😢 {stats.allTime.sad}, 😡 {stats.allTime.angry}
      </div>
    </div>
  );
};

export default StatsCard;
