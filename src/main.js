import "./style.css";
import { startAutoPlay } from "./utils/autoplay";
import { gameOver } from "./utils/game-over";
import { updateScores } from "./utils/update-scores";

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById('grid');
  const gridSize = 5; // Adjustable size N x N
  const grid = [];
  let robot1 = { x: 0, y: 0, score: 0, path: [] };
  let robot2 = { x: gridSize - 1, y: 0, score: 0, path: [] };
  let activeRobot = 'robot1';
  let autoPlay = false;

  // Generate grid with random chocolates
  function generateGrid(size) {
    grid.length = 0;
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const randomValue = Math.floor(Math.random() * 10) + 1;
        // console.log({ randomValue });
        row.push(randomValue);
      }
      grid.push(row);
    }
    // console.log({ grid })
  }


  // Render the grid
  function renderGrid() {
    // console.log("tt");
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i += 1) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      for (let j = 0; j < gridSize; j += 1) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.textContent = grid[j][i];
        console.log(cellDiv.textContent, { robot1 }, { robot2 })

        if (robot1.x === i && robot1.y === j) {
          cellDiv.classList.add('robot1');
        }
        if (robot2.x === i && robot2.y === j) {
          cellDiv.classList.add('robot2');
        }
        if (robot1.x === i && robot1.y === j && robot2.x === i && robot2.y === j) {
          cellDiv.classList.add('both-robots');
        }
        const r1Path = robot1.path;
        const r2Path = robot2.path;
        r1Path.forEach((item) => {
          if (item.x === i && item.y === j)
            cellDiv.classList.add('robot1v');
        })

        r2Path.forEach((item) => {
          if (item.x === i && item.y === j)
            cellDiv.classList.add('robot2v');
        })
        rowDiv.appendChild(cellDiv);
      }
      gridContainer.appendChild(rowDiv);
    }
  }

  function updateScore(robot, x, y) {
    robot.score += grid[y][x];
    robot.path.push({ x, y });
    grid[y][x] = 0;
  }

  function moveRobot(robot, direction) {
    console.log({ robot }, { direction })
    if (robot.y === gridSize - 1) return; // Already at the last row
    let tempX = robot.x;
    let tempY = robot.y;

    if (direction === 'left' && robot.x > 0 && robot.y < gridSize - 1) {
      tempX = tempX - 1;
      tempY = tempY + 1;
    } else if (direction === 'right' && robot.x < gridSize - 1 && robot.y < gridSize - 1) {
      tempX = tempX + 1;
      tempY = tempY + 1;
    }
    else if (robot.y < gridSize - 1) {
      tempY = tempY + 1;
      console.log("el if case");
    }

    console.log({ tempX }, { tempY })

    updateScore(robot, robot.x, robot.y);
    robot.x = tempX;
    robot.y = tempY;
    console.log({ robot })
    renderGrid();
    updateScores();
  }

  // Handle keypress for manual moves
  function handleKeyPress(event) {
    console.log({ event }, { activeRobot })

    if (event.key === 'Tab') {
      event.preventDefault();
      activeRobot = activeRobot === 'robot1' ? 'robot2' : 'robot1';
      return;
    }
    const robot = activeRobot === 'robot1' ? robot1 : robot2;
    if (['ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const direction = event.key === 'ArrowDown' ? 'down' : event.key === 'ArrowLeft' ? 'left' : 'right';
      activeRobot = activeRobot === 'robot1' ? 'robot2' : 'robot1';
      moveRobot(robot, direction)
    }
    if (robot1.y === gridSize - 1 && robot2.y === gridSize - 1) {
      gameOver()
    }
  }



  // Reset the game
  function resetGame() {
    robot1 = { x: 0, y: 0, score: 0, path: [] };
    robot2 = { x: 0, y: gridSize - 1, score: 0, path: [] };
    activeRobot = 'robot1';
    generateGrid(gridSize);
    renderGrid();
    updateScores();
  }

  // Initialize the game
  document.addEventListener('keydown', handleKeyPress);
  document.getElementById('reset-button').addEventListener('click', resetGame);
  document.getElementById('auto-play').addEventListener('click', () => {
    autoPlay = !autoPlay;
    if (autoPlay)
      startAutoPlay();
    document.getElementById('auto-play').textContent = autoPlay ? 'Disable Auto-Play' : 'Enable Auto-Play';
  });

  generateGrid(gridSize);
  renderGrid();
  updateScores();

})
