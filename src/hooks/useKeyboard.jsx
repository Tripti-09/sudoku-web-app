import { useEffect, useCallback } from 'react';
import { KEYBOARD_KEYS } from '../constants/gameConstants.js';
import { getNavigationCoords } from '../utils/gameHelpers.jsx';

export const useKeyboard = ({ 
  selectedCell, 
  isComplete, 
  onNumberInput, 
  onClear, 
  onCellSelect 
}) => {
  // Keyboard event handler
  const handleKeyPress = useCallback((event) => {
    if (!selectedCell || isComplete) return;
    
    const key = event.key;
    
    // Handle number input
    if (KEYBOARD_KEYS.NUMBERS.includes(key)) {
      event.preventDefault();
      onNumberInput(parseInt(key));
    } 
    // Handle clear actions
    else if (KEYBOARD_KEYS.CLEAR.includes(key)) {
      event.preventDefault();
      onClear();
    } 
    // Handle arrow navigation
    else if (KEYBOARD_KEYS.ARROWS.includes(key)) {
      event.preventDefault();
      const { row, col } = selectedCell;
      const newCoords = getNavigationCoords(row, col, key);
      onCellSelect(newCoords.row, newCoords.col);
    }
  }, [selectedCell, isComplete, onNumberInput, onClear, onCellSelect]);

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};