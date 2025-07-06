import React from 'react';
import GameControls from './GameControls';

const NumberPad = ({ 
  selectedCell, 
  onNumberClick, 
  onClear 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:p-6 shadow-xl border border-pink-200 bg-purple-500">
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            {num}
          </button>
        ))}
        <div className="col-span-3 flex justify-center">
          <button
            onClick={onClear}
            className="sm:w-12 sm:h-12 bg-gray-500 hover:bg-gray-400 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="text-center mt-4 mb-0 text-pink-600 text-xs sm:text-sm">
        {selectedCell ? 'Tap a number or use keyboard (1-9)' : 'Select a cell to start playing'}
      </div>
    </div>
  );
};

export default NumberPad;