// components/EmojiPicker.js
import React from 'react';

const EmojiPicker = ({ onSelect }) => {
  const emojis = ['😀', '😐', '😢', '😡'];

  return (
    <div className="flex justify-center space-x-4 mt-2 mb-6">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onSelect(emoji)}
          className="text-5xl md:text-4xl lg:text-5xl hover:scale-125 transition ease-in-out duration-300"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
