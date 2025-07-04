import { GAME_CONFIG } from '../constants/gameConstants.js';

export const useLocalStorage = () => {
  // Load saved game state
  const loadGameState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(GAME_CONFIG.STORAGE_KEY) || '{}');
      if (saved.board && saved.originalBoard) {
        return saved;
      }
    } catch (e) {
      console.log('No saved game found');
    }
    return null;
  };

  // Save game state
  const saveGameState = (gameState) => {
    try {
      localStorage.setItem(GAME_CONFIG.STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.log('Could not save game state');
    }
  };

  // Clear saved game state
  const clearGameState = () => {
    try {
      localStorage.removeItem(GAME_CONFIG.STORAGE_KEY);
    } catch (e) {
      console.log('Could not clear saved state');
    }
  };

  return {
    loadGameState,
    saveGameState,
    clearGameState
  };
};