import { GAME_CONFIG } from '../constants/gameConstants.js';

// Get cell styling based on state
export const getCellStyles = (row, col, { isSelected, isOriginal, isInvalid, gameId }) => {
  let className = "border text-center font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center ";
  
  // Responsive sizing
  className += "w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base md:w-12 md:h-12 md:text-lg ";
  
  if (isSelected) {
    className += "bg-pink-200 border-pink-400 border-2 shadow-lg ring-2 ring-pink-300 ";
  } else if (isOriginal) {
    className += "bg-pink-50 text-pink-800 border-pink-200 ";
  } else {
    className += "bg-white hover:bg-pink-50 border-pink-100 ";
  }
  
  if (isInvalid) {
    className += "text-red-500 bg-red-50 ";
  }
  
  // Add thicker borders for 3x3 sections
  if (row % GAME_CONFIG.BOX_SIZE === 0) className += "border-t-2 border-t-pink-300 ";
  if (col % GAME_CONFIG.BOX_SIZE === 0) className += "border-l-2 border-l-pink-300 ";
  if (row === GAME_CONFIG.BOARD_SIZE - 1) className += "border-b-2 border-b-pink-300 ";
  if (col === GAME_CONFIG.BOARD_SIZE - 1) className += "border-r-2 border-r-pink-300 ";
  
  return className;
};

// Common button styles
export const buttonStyles = {
  primary: "bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition-colors",
  secondary: "bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors",
  disabled: "bg-gray-300 cursor-not-allowed text-white rounded-full p-2",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 transition-colors",
  danger: "bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 transition-colors",
  success: "bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 transition-colors"
};

// Number pad button styles
export const numberButtonStyles = {
  number: "w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base",
  clear: "w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
};

// Container styles
export const containerStyles = {
  main: "min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-2 sm:p-4",
  content: "max-w-4xl mx-auto",
  board: "bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border border-pink-200 mb-4 sm:mb-6",
  controls: "bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-pink-200"
};