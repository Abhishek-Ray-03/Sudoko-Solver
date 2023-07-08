document.addEventListener('DOMContentLoaded', () => {
    const solveBtn = document.getElementById('solveBtn');
    const sudokuGrid = document.getElementById('sudokuGrid');
  
    solveBtn.addEventListener('click', solveSudoku);
  
    function solveSudoku() {
      const grid = [];
  
      // Retrieve values from the grid and store in the grid array
      for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          const cell = sudokuGrid.rows[i].cells[j].querySelector('input');
          const value = parseInt(cell.value) || 0;
          row.push(value);
        }
        grid.push(row);
      }
  
      // Call the Sudoku solver algorithm
      const solvedGrid = solve(grid);
  
      // Populate the solved values back into the grid
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = sudokuGrid.rows[i].cells[j].querySelector('input');
          cell.value = solvedGrid[i][j];
        }
      }
    }
  
    function solve(grid) {
      // Find an empty cell (cell with value 0)
      const emptyCell = findEmptyCell(grid);
      
      // If all cells are filled, the puzzle is solved
      if (!emptyCell) {
        return grid;
      }
      
      const row = emptyCell[0];
      const col = emptyCell[1];
      
      // Try each number from 1 to 9
      for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
          grid[row][col] = num;
          
          if (solve(grid)) {
            return grid;
          }
          
          // Reset the cell if the number is not valid
          grid[row][col] = 0;
        }
      }
      
      // If no number from 1 to 9 works, backtrack
      return false;
    }
    
    function findEmptyCell(grid) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            return [row, col];
          }
        }
      }
      return null;
    }
    
    function isValid(grid, row, col, num) {
      // Check if the number is already present in the same row
      for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) {
          return false;
        }
      }
      
      // Check if the number is already present in the same column
      for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) {
          return false;
        }
      }
      
      // Check if the number is already present in the same 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[boxRow + i][boxCol + j] === num) {
            return false;
          }
        }
      }
      
      return true;
    }
  });
  