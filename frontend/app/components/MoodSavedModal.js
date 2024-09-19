// components/MoodSavedModal.js
import React from 'react';

const MoodSavedModal = ({ isOpen, mood, timestamp, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-gray-50 p-6 py-10 shadow-lg rounded-md max-w-md w-full relative mx-6 border-blue-400">
        <button 
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl" 
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4 font-sans text-blue-500 text-center">Mood Saved Successfully!</h1>
        <p className="text-lg font-sans text-gray-700 mb-2 pl-4">Mood: <span className="font-semibold">{mood}</span></p>
        <p className="text-lg font-sans text-gray-700 mb-2 pl-4">Timestamp: <span className="font-medium text-base">{timestamp}</span></p>
      </div>
    </div>
  );
};

export default MoodSavedModal;
