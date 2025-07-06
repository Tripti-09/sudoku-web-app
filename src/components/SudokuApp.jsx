import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';
import GameControls from './GameControls';
import GameHeader from './GameHeader';

const SudokuApp = () => {
  // Generate a complete valid sudoku solution
  const generateCompleteSudoku = () => {
    const board = Array(9).fill().map(() => Array(9).fill(0));
    
    const isValid = (board, row, col, num) => {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
      }
      
      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }
      
      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (board[i][j] === num) return false;
        }
      }
      
      return true;
    };

    const fillBoard = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
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
  const createPuzzle = (difficulty = 'easy') => {
    const complete = generateCompleteSudoku();
    const puzzle = complete.map(row => [...row]);
    
    // Number of cells to remove based on difficulty
    const cellsToRemove = {
      easy: 35,
      medium: 45,
      hard: 55
    };
    
    const toRemove = cellsToRemove[difficulty] || 45;
    let removed = 0;
    
    while (removed < toRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    
    return { puzzle, solution: complete };
  };

  // Load saved game state
  const loadGameState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('sudoku_game_state') || '{}');
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
      localStorage.setItem('sudoku_game_state', JSON.stringify(gameState));
    } catch (e) {
      console.log('Could not save game state');
    }
  };

  // Initialize game
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
        board: puzzle.map(row => [...row]),
        originalBoard: puzzle.map(row => [...row]),
        solution,
        timer: 0,
        gameId: Date.now(),
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
  }, [board, timer, isComplete, gameId, originalBoard, solution, history, historyIndex, hintsUsed]);

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

  // Add to history
  const addToHistory = (newBoard) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(board.map(row => [...row]));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Validation function
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

  // Keyboard event handler
  const handleKeyPress = useCallback((event) => {
    if (!selectedCell || isComplete) return;
    
    const key = event.key;
    if (key >= '1' && key <= '9') {
      event.preventDefault();
      handleNumberClick(parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
      event.preventDefault();
      handleClear();
    } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;
      
      switch (key) {
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(8, row + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(8, col + 1);
          break;
      }
      
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, isComplete]);

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Event handlers
  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num) => {
    if (selectedCell && !isComplete) {
      const { row, col } = selectedCell;
      if (originalBoard[row][col] === 0) {
        addToHistory(board);
        const newBoard = [...board];
        newBoard[row][col] = num;
        setBoard(newBoard);
        
        if (!isRunning) setIsRunning(true);
        
        // Check if puzzle is complete
        const isFull = newBoard.every(row => row.every(cell => cell !== 0));
        if (isFull) {
          const isValid = newBoard.every((row, rowIndex) =>
            row.every((cell, colIndex) => isValidMove(rowIndex, colIndex, cell))
          );
          if (isValid) {
            setIsComplete(true);
            setIsRunning(false);
            // Clear saved state when completed
            try {
              localStorage.removeItem('sudoku_game_state');
            } catch (e) {
              console.log('Could not clear saved state');
            }
          }
        }
      }
    }
  };

  const handleClear = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      if (originalBoard[row][col] === 0 && board[row][col] !== 0) {
        addToHistory(board);
        const newBoard = [...board];
        newBoard[row][col] = 0;
        setBoard(newBoard);
      }
    }
  };

  const handleUndo = () => {
    if (historyIndex >= 0) {
      setBoard(history[historyIndex].map(row => [...row]));
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBoard(history[historyIndex + 1].map(row => [...row]));
    }
  };

  const handleHint = () => {
    if (hintsUsed >= 5 || !selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    if (originalBoard[row][col] === 0 && board[row][col] === 0) {
      addToHistory(board);
      const newBoard = [...board];
      newBoard[row][col] = solution[row][col];
      setBoard(newBoard);
      setHintsUsed(hintsUsed + 1);
      
      if (!isRunning) setIsRunning(true);
    }
  };

  const startNewGame = () => {
    const { puzzle, solution } = createPuzzle('medium');
    const newGameId = Date.now();
    
    setBoard(puzzle.map(row => [...row]));
    setOriginalBoard(puzzle.map(row => [...row]));
    setSolution(solution);
    setSelectedCell(null);
    setTimer(0);
    setIsRunning(false);
    setIsComplete(false);
    setGameId(newGameId);
    setHistory([]);
    setHistoryIndex(-1);
    setHintsUsed(0);
    
    // Clear old saved state
    try {
      localStorage.removeItem('sudoku_game_state');
    } catch (e) {
      console.log('Could not clear saved state');
    }
  };

  const resetCurrentGame = () => {
    setBoard(originalBoard.map(row => [...row]));
    setSelectedCell(null);
    setTimer(0);
    setIsRunning(false);
    setIsComplete(false);
    setHistory([]);
    setHistoryIndex(-1);
    setHintsUsed(0);
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-2 sm:p-4">

      {/* <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="text-pink-500" size={24} />
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Pretty Sudoku
        </h1>
        <Sparkles className="text-pink-500" size={24} />
      </div> */}

      <GameHeader 
        timer={timer}
        hintsRemaining={5 - hintsUsed}
        isComplete={isComplete}
      />

      <div className="flex justify-evenly px-4">
        {/* <GameHeader 
          timer={timer}
          hintsRemaining={5 - hintsUsed}
          isComplete={isComplete}
        /> */}
        
        <GameControls 
          isRunning={isRunning}
          onPlayPause={handlePlayPause}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onHint={handleHint}
          onReset={resetCurrentGame}
          onNewGame={startNewGame}
          historyIndex={historyIndex}
          historyLength={history.length}
          hintsUsed={hintsUsed}
          selectedCell={selectedCell}
          originalBoard={originalBoard}
        />
        
        {/* {isComplete && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 shadow-lg mb-4 mx-auto block w-fit">
            <Trophy size={20} />
            <span className="font-semibold text-sm sm:text-base">Congratulations! Puzzle Complete!</span>
          </div>
        )} */}
        
        {/* <div className="text-xs sm:text-sm text-pink-600 mb-2 text-center">
          Use keyboard (1-9, arrows, backspace) • Game auto-saves ✨
        </div> */}

        <SudokuBoard 
          board={board}
          selectedCell={selectedCell}
          originalBoard={originalBoard}
          gameId={gameId}
          onCellClick={handleCellClick}
          isComplete={isComplete}
        />

        <NumberPad 
          selectedCell={selectedCell}
          onNumberClick={handleNumberClick}
          onClear={handleClear}
        />
      </div>
    </div>
  );
};

export default SudokuApp;