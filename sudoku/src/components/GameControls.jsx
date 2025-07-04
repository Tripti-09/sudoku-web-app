import React from 'react';
import { Play, Pause, RotateCcw, Plus, Undo, Redo, Lightbulb } from 'lucide-react';

const GameControls = ({
  isRunning,
  onPlayPause,
  onUndo,
  onRedo,
  onHint,
  onReset,
  onNewGame,
  historyIndex,
  historyLength,
  hintsUsed,
  selectedCell,
  originalBoard
}) => {
  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < historyLength - 1;
  const canHint = hintsUsed < 5 && selectedCell && originalBoard[selectedCell?.row]?.[selectedCell?.col] === 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 mb-4 flex-wrap">
      <button
        onClick={onPlayPause}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition-colors"
        title={isRunning ? 'Pause' : 'Resume'}
      >
        {isRunning ? <Pause size={22} /> : <Play size={22} />}
      </button>
      
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
        title="Undo"
      >
        <Undo size={22} />
      </button>
      
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
        title="Redo"
      >
        <Redo size={22} />
      </button>
      
      <button
        onClick={onHint}
        disabled={!canHint}
        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
        title="Get hint for selected cell"
      >
        <Lightbulb size={22} />
      </button>
      
      <button
        onClick={onReset}
        className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 transition-colors"
        title="Reset current puzzle"
      >
        <RotateCcw size={22} />
      </button>
      
      <button
        onClick={onNewGame}
        className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 transition-colors"
        title="Start new puzzle"
      >
        <Plus size={22} />
      </button>
    </div>
  );
};

export default GameControls;