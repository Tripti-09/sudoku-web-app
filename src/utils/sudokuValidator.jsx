import { GAME_CONFIG } from '../constants/gameConstants.js';

// Check if a move is valid
export const isValidMove = (board, row, col, num) => {
  // Check row
  for (let i = 0; i < GAME_CONFIG.BOARD_SIZE; i++) {
    if (i !== col && board[row][i] === num) return false;
  }
  
  // Check column
  for (let i = 0; i < GAME_CONFIG.BOARD_SIZE; i++) {
    if (i !== row && board[i][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / GAME_CONFIG.BOX_SIZE) * GAME_CONFIG.BOX_SIZE;
  const boxCol = Math.floor(col / GAME_CONFIG.BOX_SIZE) * GAME_CONFIG.BOX_SIZE;
  for (let i = boxRow; i < boxRow + GAME_CONFIG.BOX_SIZE; i++) {
    for (let j = boxCol; j < boxCol + GAME_CONFIG.BOX_SIZE; j++) {
      if ((i !== row || j !== col) && board[i][j] === num) return false;
    }
  }
  
  return true;
};

// Check if the puzzle is completely solved
export const isPuzzleComplete = (board) => {
  // Check if all cells are filled
  const isFull = board.every(row => row.every(cell => cell !== 0));
  if (!isFull) return false;
  
  // Check if all moves are valid
  return board.every((row, rowIndex) =>
    row.every((cell, colIndex) => isValidMove(board, rowIndex, colIndex, cell))
  );
};

// Get all empty cells
export const getEmptyCells = (board) => {
  const emptyCells = [];
  for (let row = 0; row < GAME_CONFIG.BOARD_SIZE; row++) {
    for (let col = 0; col < GAME_CONFIG.BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};