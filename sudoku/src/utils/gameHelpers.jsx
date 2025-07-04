// Format time in MM:SS format
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Deep clone a 2D array
export const cloneBoard = (board) => {
  return board.map(row => [...row]);
};

// Generate unique game ID
export const generateGameId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Get navigation coordinates based on arrow key
export const getNavigationCoords = (currentRow, currentCol, direction) => {
  let newRow = currentRow;
  let newCol = currentCol;
  
  switch (direction) {
    case 'ArrowUp':
      newRow = Math.max(0, currentRow - 1);
      break;
    case 'ArrowDown':
      newRow = Math.min(8, currentRow + 1);
      break;
    case 'ArrowLeft':
      newCol = Math.max(0, currentCol - 1);
      break;
    case 'ArrowRight':
      newCol = Math.min(8, currentCol + 1);
      break;
    default:
      break;
  }
  
  return { row: newRow, col: newCol };
};

// Check if two cell positions are equal
export const areCellsEqual = (cell1, cell2) => {
  if (!cell1 || !cell2) return false;
  return cell1.row === cell2.row && cell1.col === cell2.col;
};