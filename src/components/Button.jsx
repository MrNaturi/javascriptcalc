import React from 'react';

const Button = ({ number, onClick, isAction, isClear }) => {
  let actionStyles = '';
  if (isAction) {
    if (number === '=') {
      actionStyles = 'bg-green-600 hover:bg-green-500 text-white';
    } else {
      actionStyles = 'bg-orange-600 hover:bg-orange-500 text-white';
    }
    
    if (isClear) {
      actionStyles = 'bg-red-600 hover:bg-red-500 text-white';
    }
  } else {
    actionStyles = 'bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition';
  }

  return (
    <button
      onClick={onClick}
      className={`${actionStyles} flex items-center justify-center font-bold py-3 px-6 rounded-lg transition-all`}
    >
      {number}
    </button>
  );
};

export default Button;
