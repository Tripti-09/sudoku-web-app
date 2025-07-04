# 🌸 Sudoku Web App

A beautiful, interactive Sudoku game built with React and styled with Tailwind CSS. Features a stunning pink gradient design, auto-save functionality, and intuitive gameplay.



## ✨ Features

- **Beautiful UI Design**: Elegant pink gradient theme with smooth animations
- **Auto-Save**: Game state automatically saves and restores
- **Multiple Input Methods**: Click buttons or use keyboard (1-9, arrows, backspace)
- **Game Controls**: Play/pause, undo/redo, hints, reset, and new game
- **Hint System**: Up to 5 hints per game to help when stuck
- **Timer**: Track your solving time with play/pause functionality
- **Validation**: Real-time validation with visual feedback for invalid moves
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Full keyboard support for seamless gameplay

## 🎮 How to Play

1. Click on any empty cell to select it
2. Enter numbers 1-9 using the number pad or keyboard
3. Use the arrow keys to navigate between cells
4. Invalid moves are highlighted in red
5. Complete the puzzle by filling all cells with valid numbers
6. Use hints (💡) when you're stuck (maximum 5 per game)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tripti-09/sudoku-web-app.git
cd sudoku-web-app
cd sudoku
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SudokuApp.js          # Main app component
│   ├── SudokuBoard.js        # Game board component
│   ├── NumberPad.js          # Number input buttons
│   ├── GameControls.js       # Control buttons (play, pause, etc.)
│   └── GameHeader.js         # Header with title and status
├── hooks/
│   ├── useGameState.js       # Game state management
│   ├── useKeyboard.js        # Keyboard input handling
│   └── useLocalStorage.js    # Local storage operations
├── utils/
│   ├── sudokuGenerator.js    # Puzzle generation logic
│   ├── sudokuValidator.js    # Validation functions
│   └── gameHelpers.js        # Helper functions
├── constants/
│   └── gameConstants.js      # Game constants and config
└── styles/
    └── gameStyles.js         # Shared styling utilities
```

## 🎯 Game Features

### Core Gameplay
- **Puzzle Generation**: Algorithmically generated valid Sudoku puzzles
- **Difficulty Levels**: Easy (35 clues), Medium (45 clues), Hard (55 clues)
- **Real-time Validation**: Instant feedback on invalid moves
- **Auto-completion Detection**: Automatically detects when the puzzle is solved

### User Interface
- **Responsive Design**: Optimized for all screen sizes
- **Visual Feedback**: Highlighted selected cells and invalid moves
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Keyboard navigation and focus management

### Game Management
- **Auto-Save**: Game state persists between sessions
- **History System**: Undo/redo functionality with move history
- **Timer**: Accurate time tracking with pause/resume
- **Hints**: Smart hint system that reveals the correct numbers

## 🎨 Design System

### Color Palette
- **Primary**: Pink/Rose gradients (#ec4899, #f43f5e)
- **Secondary**: Soft pinks and whites with backdrop blur
- **Accent**: Blue for controls, Yellow for hints, Gray for utilities
- **Background**: Gradient from pink-50 to rose-50

### Typography
- **Primary Font**: System default with fallbacks
- **Sizes**: Responsive text sizing (sm:text-base, md:text-lg)
- **Weight**: Semibold for numbers, bold for buttons

## 🔧 Technical Details

### Built With
- **React** (v18+) - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Local Storage** - Game state persistence

### Key Components
- **SudokuBoard**: Renders the 9x9 grid with proper styling
- **NumberPad**: Provides number input interface
- **GameControls**: Manages game actions and controls
- **GameHeader**: Displays timer and game status

### Algorithms
- **Sudoku Generation**: Backtracking algorithm for valid puzzle creation
- **Puzzle Creation**: Strategic cell removal to create solvable puzzles
- **Validation**: Real-time constraint checking for rows, columns, and boxes

## 🎯 Future Enhancements

- [ ] Multiple difficulty levels selection
- [ ] Daily challenges
- [ ] Statistics and achievements
- [ ] Theme customization
- [ ] Multiplayer mode
- [ ] Puzzle sharing
- [ ] Custom puzzle import
- [ ] Tutorial mode
- [ ] Sound effects
- [ ] Performance analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Add comments for complex logic
3. Test your changes thoroughly
4. Update documentation as needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic Sudoku puzzles
- Built with modern React patterns
- Styled with Tailwind CSS utilities
- Icons from Lucide React

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

### 🌟 Show Your Support

If you found this project helpful, please consider giving it a star! ⭐

**Happy Sudoku Solving!** 🧩✨
