import { useState, useEffect } from 'react';
import axios from 'axios';

const StatsCard = () => {
  const [stats, setStats] = useState({
    lastMood: '',
    lastDate: '',
    today: { "😀": 0, "😐": 0, "😢": 0, "😡": 0 },
    allTime: { "😀": 0, "😐": 0, "😢": 0, "😡": 0 }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   setError('User token is missing.');
        //   return;
        // }
        const username = localStorage.getItem('username');
        if (!username) {
        console.error("No username found, user is not authenticated");
        return;
      }

        const response = await axios.get('https://95a5-103-220-204-29.ngrok-free.app/stats', {
          // headers: { Authorization: `Bearer ${token}` }
        });

        const { last_mood, last_date, today, all_time } = response.data;
        setStats({
          lastMood: last_mood,
          lastDate: last_date,
          today,
          allTime: all_time
        });
        console.log(JSON.stringify(response));
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
    <div>
    <div className="w-full  bg-gray-50 shadow-md rounded-md p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Statistics</h2>

      {/* Last Logged Mood */}
      <div className="mb-4">
        <strong className="text-gray-800 font-semibold">Last Logged Mood:</strong> {stats.lastMood} on {stats.lastDate}
      </div>

      {/* Moods Today */}
      <div className="mb-4">
        <strong className="text-gray-800 font-semibold">Moods Today:</strong> 😀 {stats.today["😀"]}, 😐 {stats.today["😐"]}, 😢 {stats.today["😢"]}, 😡 {stats.today["😡"]}
      </div>

      {/* All-Time Moods */}
      <div className="mb-2">
        <strong className="text-gray-800 font-semibold">All-Time Moods:</strong> 😀 {stats.allTime["😀"]}, 😐 {stats.allTime["😐"]}, 😢 {stats.allTime["😢"]}, 😡 {stats.allTime["😡"]}
      </div>
    </div>
    <p className=' text-gray-500 font-sans text-xs mt-8 px-2'>Note: If you cannot see the updates, please reload the page and log in again.</p>
    </div>
    
  );
};

export default StatsCard;
