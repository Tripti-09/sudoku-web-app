import { GAME_CONFIG, DIFFICULTY_LEVELS } from '../constants/gameConstants.js';

// Generate a complete valid sudoku solution
export const generateCompleteSudoku = () => {
  const board = Array(GAME_CONFIG.BOARD_SIZE).fill().map(() => 
    Array(GAME_CONFIG.BOARD_SIZE).fill(0)
  );
  
  const isValid = (board, row, col, num) => {
    // Check row
    for (let i = 0; i < GAME_CONFIG.BOARD_SIZE; i++) {
      if (board[row][i] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < GAME_CONFIG.BOARD_SIZE; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / GAME_CONFIG.BOX_SIZE) * GAME_CONFIG.BOX_SIZE;
    const boxCol = Math.floor(col / GAME_CONFIG.BOX_SIZE) * GAME_CONFIG.BOX_SIZE;
    for (let i = boxRow; i < boxRow + GAME_CONFIG.BOX_SIZE; i++) {
      for (let j = boxCol; j < boxCol + GAME_CONFIG.BOX_SIZE; j++) {
        if (board[i][j] === num) return false;
      }
    }
    
    return true;
  };

  const fillBoard = (board) => {
    for (let row = 0; row < GAME_CONFIG.BOARD_SIZE; row++) {
      for (let col = 0; col < GAME_CONFIG.BOARD_SIZE; col++) {
        if (board[row][col] === 0) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (let num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillBoard(board);
  return board;
};

// Create puzzle by removing numbers from complete solution
export const createPuzzle = (difficulty = 'medium') => {
  const complete = generateCompleteSudoku();
  const puzzle = complete.map(row => [...row]);
  
  const toRemove = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.medium;
  let removed = 0;
  
  while (removed < toRemove) {
    const row = Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE);
    const col = Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return { puzzle, solution: complete };
};