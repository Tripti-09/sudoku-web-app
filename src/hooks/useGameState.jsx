import { useState, useEffect } from 'react';
import { createPuzzle } from '../utils/sudokuGenerator.jsx';
import { isPuzzleComplete, isValidMove } from '../utils/sudokuValidator.jsx';
import { cloneBoard, generateGameId } from '../utils/gameHelpers.jsx';
import { useLocalStorage } from './useLocalStorage.jsx';
import { GAME_CONFIG } from '../constants/gameConstants.js';

export const useGameState = () => {
  const { loadGameState, saveGameState, clearGameState } = useLocalStorage();

  // Initialize game state
  const initializeGame = () => {
    const savedState = loadGameState();
    
    if (savedState && !savedState.isComplete) {
      return {
        board: savedState.board,
        originalBoard: savedState.originalBoard,
        solution: savedState.solution,
        timer: savedState.timer || 0,
        gameId: savedState.gameId,
        history: savedState.history || [],
        historyIndex: savedState.historyIndex || -1,
        hintsUsed: savedState.hintsUsed || 0
      };
    } else {
      const { puzzle, solution } = createPuzzle('medium');
      return {
        board: cloneBoard(puzzle),
        originalBoard: cloneBoard(puzzle),
        solution,
        timer: 0,
        gameId: generateGameId(),
        history: [],
        historyIndex: -1,
        hintsUsed: 0
      };
    }
  };

  const initialState = initializeGame();
  const [board, setBoard] = useState(initialState.board);
  const [originalBoard, setOriginalBoard] = useState(initialState.originalBoard);
  const [solution, setSolution] = useState(initialState.solution);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(initialState.timer);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [gameId, setGameId] = useState(initialState.gameId);
  const [history, setHistory] = useState(initialState.history);
  const [historyIndex, setHistoryIndex] = useState(initialState.historyIndex);
  const [hintsUsed, setHintsUsed] = useState(initialState.hintsUsed);

  // Auto-save game state
  useEffect(() => {
    if (!isComplete) {
      const gameState = {
        board,
        originalBoard,
        solution,
        timer,
        isComplete,
        gameId,
        history,
        historyIndex,
        hintsUsed,
        lastSaved: Date.now()
      };
      saveGameState(gameState);
    }
  }, [board, timer, isComplete, gameId, originalBoard, solution, history, historyIndex, hintsUsed, saveGameState]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Add move to history
  const addToHistory = (newBoard) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cloneBoard(board));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Game actions
  const actions = {
    selectCell: (row, col) => {
      setSelectedCell({ row, col });
    },

    inputNumber: (num) => {
      if (selectedCell && !isComplete) {
        const { row, col } = selectedCell;
        if (originalBoard[row][col] === 0) {
          addToHistory(board);
          const newBoard = cloneBoard(board);
          newBoard[row][col] = num;
          setBoard(newBoard);
          
          if (!isRunning) setIsRunning(true);
          
          // Check if puzzle is complete
          if (isPuzzleComplete(newBoard)) {
            setIsComplete(true);
            setIsRunning(false);
            clearGameState();
          }
        }
      }
    },

    clearCell: () => {
      if (selectedCell) {
        const { row, col } = selectedCell;
        if (originalBoard[row][col] === 0 && board[row][col] !== 0) {
          addToHistory(board);
          const newBoard = cloneBoard(board);
          newBoard[row][col] = 0;
          setBoard(newBoard);
        }
      }
    },

    undo: () => {
      if (historyIndex >= 0) {
        setBoard(cloneBoard(history[historyIndex]));
        setHistoryIndex(historyIndex - 1);
      }
    },

    redo: () => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setBoard(cloneBoard(history[historyIndex + 1]));
      }
    },

    useHint: () => {
      if (hintsUsed >= GAME_CONFIG.MAX_HINTS || !selectedCell || isComplete) return;
      
      const { row, col } = selectedCell;
      if (originalBoard[row][col] === 0 && board[row][col] === 0) {
        addToHistory(board);
        const newBoard = cloneBoard(board);
        newBoard[row][col] = solution[row][col];
        setBoard(newBoard);
        setHintsUsed(hintsUsed + 1);
        
        if (!isRunning) setIsRunning(true);
      }
    },

    startNewGame: () => {
      const { puzzle, solution } = createPuzzle('medium');
      const newGameId = generateGameId();
      
      setBoard(cloneBoard(puzzle));
      setOriginalBoard(cloneBoard(puzzle));
      setSolution(solution);
      setSelectedCell(null);
      setTimer(0);
      setIsRunning(false);
      setIsComplete(false);
      setGameId(newGameId);
      setHistory([]);
      setHistoryIndex(-1);
      setHintsUsed(0);
      
      clearGameState();
    },

    resetGame: () => {
      setBoard(cloneBoard(originalBoard));
      setSelectedCell(null);
      setTimer(0);
      setIsRunning(false);
      setIsComplete(false);
      setHistory([]);
      setHistoryIndex(-1);
      setHintsUsed(0);
    },

    toggleTimer: () => {
      setIsRunning(!isRunning);
    }
  };

  // Game state
  const gameState = {
    board,
    originalBoard,
    solution,
    selectedCell,
    timer,
    isRunning,
    isComplete,
    gameId,
    history,
    historyIndex,
    hintsUsed,
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    hintsRemaining: GAME_CONFIG.MAX_HINTS - hintsUsed
  };

  // Validation helper
  const validation = {
    isValidMove: (row, col, num) => isValidMove(board, row, col, num),
    isOriginalCell: (row, col) => originalBoard[row][col] !== 0,
    isEmptyCell: (row, col) => board[row][col] === 0
  };

  return {
    gameState,
    actions,
    validation
  };
};