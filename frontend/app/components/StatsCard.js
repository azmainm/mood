// components/StatsCard.js
import React from 'react';

const StatsCard = ({ stats }) => {
  return (
    <div className="w-full md:w-3/5 bg-gray-50 shadow-md rounded-md p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Mood Statistics</h2>
      <div className="mb-4">
        <strong className='text-gray-800 font-semibold'>Last Logged Mood:</strong> {stats.lastMood} on {stats.lastDate}
      </div>
      <div className="mb-4">
        <strong className='text-gray-800 font-semibold'>Moods Today:</strong> 😀 {stats.today.happy}, 😐 {stats.today.neutral}, 😢 {stats.today.sad}, 😡 {stats.today.angry}
      </div>
      <div className='mb-2'>
        <strong className='text-gray-800 font-semibold'>All-Time Moods:</strong> 😀 {stats.allTime.happy}, 😐 {stats.allTime.neutral}, 😢 {stats.allTime.sad}, 😡 {stats.allTime.angry}
      </div>
    </div>
  );
};

export default StatsCard;
