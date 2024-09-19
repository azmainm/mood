// components/EmojiPicker.js
import React from 'react';
import axios from 'axios';

const EmojiPicker = ({ onSelect }) => {
  const emojis = ['😀', '😐', '😢', '😡'];

  const handleEmojiSelect = async (emoji) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, user is not authenticated");
        return;
      }

      const response = await axios.post(
        'https://d365-103-220-204-28.ngrok.io/mood',
        { emoji },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Mood saved:", response.data);
    } catch (error) {
      console.error("Failed to save mood:", error);
    }
    onSelect(emoji);
  };

  return (
    <div className="flex justify-center space-x-4 mt-2 mb-6">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => handleEmojiSelect(emoji)}
          className="text-5xl md:text-4xl lg:text-5xl hover:scale-125 transition ease-in-out duration-300"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
