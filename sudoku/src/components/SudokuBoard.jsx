import React from 'react';

const SudokuBoard = ({ 
  board, 
  selectedCell, 
  originalBoard, 
  gameId, 
  onCellClick, 
  isComplete 
}) => {
  const isValidMove = (row, col, num) => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && board[i][j] === num) return false;
      }
    }
    
    return true;
  };

  const getCellStyle = (row, col) => {
    const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;
    const isOriginal = originalBoard[row][col] !== 0;
    const isInvalid = board[row][col] !== 0 && !isValidMove(row, col, board[row][col]);
    
    let className = "border text-center font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center ";
    
    // Responsive sizing
    className += "w-8 h-8 text-sm sm:w-10 sm:h-10 sm:text-base md:w-12 md:h-12 md:text-lg ";
    
    if (isSelected) {
      className += "bg-pink-200 border-red-300 shadow-lg ring-purple-300 ";
    } else if (isOriginal) {
      className += "bg-pink-50 text-pink-800 border-pink-200 ";
    } else {
      className += "bg-white hover:bg-pink-50 border-pink-100 ";
    }
    
    if (isInvalid) {
      className += "text-red-500 bg-red-50 ";
    }
    
    // Add thicker borders for 3x3 sections
    if (row % 3 === 0) className += "border-t-1 border-t-pink-300 ";
    if (col % 3 === 0) className += "border-l-1 border-l-pink-300 ";
    if (row === 8) className += "border-b-1 border-b-pink-300 ";
    if (col === 8) className += "border-r-1 border-r-pink-300 ";
    
    return className;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border border-pink-200 mb-4 sm:mb-6">
      <div className="grid grid-cols-9 gap-0 w-fit mx-auto border-2 border-pink-300 rounded-lg overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${gameId}-${rowIndex}-${colIndex}`}
              className={getCellStyle(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              tabIndex={0}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;