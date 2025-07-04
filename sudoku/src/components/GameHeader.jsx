import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { formatTime } from '../utils/gameHelpers.jsx';

const GameHeader = ({ timer, hintsRemaining, isComplete }) => {
  return (
    <div className="text-center sm:mb-8">
      {/* Title */}
      <div className="flex items-center justify-evenly">
        <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 border border-pink-200">
          <span className="text-pink-700 font-semibold text-sm sm:text-base">
            {formatTime(timer)}
          </span>
        </div>
        <div className='flex '>
          <Sparkles className="text-pink-500" size={24} />
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Pretty Sudoku
          </h1>
          <Sparkles className="text-pink-500" size={24} />
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 border border-pink-200">
          <span className="text-pink-700 font-semibold text-sm sm:text-base">
            💡{hintsRemaining}
          </span>
        </div>
      </div>
      
      {/* Timer and Hints Display */}
      {/* <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
        <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 border border-pink-200">
          <span className="text-pink-700 font-semibold text-sm sm:text-base">
            {formatTime(timer)}
          </span>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 border border-pink-200">
          <span className="text-pink-700 font-semibold text-sm sm:text-base">
            💡{hintsRemaining}
          </span>
        </div>
      </div> */}
      
      {/* Completion Message */}
      {isComplete && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 shadow-lg mb-4">
          <Trophy size={20} />
          <span className="font-semibold text-sm sm:text-base">
            Congratulations! Puzzle Complete!
          </span>
        </div>
      )}
      
      {/* Instructions */}
      {/* <div className="text-xs sm:text-sm text-pink-600 pt-2">
        Use keyboard (1-9, arrows, backspace) • Game auto-saves✨
      </div> */}
    </div>
  );
};

export default GameHeader