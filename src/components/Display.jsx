import React from 'react';

const Display = ({ display }) => {
    return (
      <div 
        className="bg-white text-black py-4 px-6 text-4xl rounded-lg w-full h-20 flex items-center justify-end overflow-hidden"
      >
        {display}
      </div>
    );
  };

export default Display;
