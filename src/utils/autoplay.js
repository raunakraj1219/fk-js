export function startAutoPlay(robot) {
    if (robot.x === gridSize - 1) return;

    const directions = ['down', 'left', 'right'];
    let bestMove = { chocolates: 0, direction: null };

    directions.forEach((dir) => {
        const newY = robot.y + 1;
        let newX = robot.x;

        if (dir === 'left' && robot.x > 0) newX -= 1;
        if (dir === 'right' && robot.x < gridSize - 1) newX += 1;

        const chocolates = grid[newY][newX] || 0;
        if (chocolates > bestMove.chocolates) {
            bestMove = { chocolates, direction: dir };
        }
    });

    moveRobot(robot, bestMove.direction);
}