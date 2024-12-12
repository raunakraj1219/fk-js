export function updateScores() {
    document.getElementById('robot1-score').textContent = `Robot 1: ${robot1.score}`;
    document.getElementById('robot2-score').textContent = `Robot 2: ${robot2.score}`;
}