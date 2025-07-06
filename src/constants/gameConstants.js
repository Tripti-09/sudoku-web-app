// Game configuration constants
export const GAME_CONFIG = {
  BOARD_SIZE: 9,
  BOX_SIZE: 3,
  MAX_HINTS: 5,
  STORAGE_KEY: 'sudoku_game_state'
};

export const DIFFICULTY_LEVELS = {
  easy: 35,
  medium: 45,
  hard: 55
};

export const KEYBOARD_KEYS = {
  NUMBERS: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  CLEAR: ['Backspace', 'Delete', '0'],
  ARROWS: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
};

export const CELL_STATES = {
  EMPTY: 0,
  FILLED: 1,
  ORIGINAL: 2,
  INVALID: 3,
  SELECTED: 4
};