export const config = {
  // Preset 5x5 matrix
  interactionMatrix: [
    [0.2, 0.5, -0.3, 0.1, -0.2], 
    [-0.5, 0.8, -0.1, 0.3, 0.4],
    [0.1, -0.4, 0.4, -0.2, 0.1],
    [-0.3, 0.1, 0.5, 0.4, -0.5],
    [0.2, -0.1, 0.2, 0.1, 0.3]
  ],
  MAX_DISTANCE: 80,
  MIN_DISTANCE: 15,
  FORCE_MULTIPLIER: 1.0,
  FRICTION: 0.85
};

export function randomizeMatrix() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      config.interactionMatrix[i][j] = (Math.random() - 0.5) * 2;
    }
  }
}

export function applyInteractions(particles, spatialGrid) {
  // If spatial grid isn't passed (e.g. testing context without setup), fallback would go here 
  // but we enforce SpatialGrid structure for optimization.
  for (let i = 0; i < particles.length; i++) {
    let fx = 0;
    let fy = 0;
    const a = particles[i];

    // Determine the host bin
    let centerCol = Math.floor(a.x / spatialGrid.cellSize);
    let centerRow = Math.floor(a.y / spatialGrid.cellSize);

    // Iterate through current bin + 8 surrounding neighborhood bins
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const c = centerCol + colOffset;
        const r = centerRow + rowOffset;

        if (c >= 0 && c < spatialGrid.cols && r >= 0 && r < spatialGrid.rows) {
          const idx = c + r * spatialGrid.cols;
          const cellContent = spatialGrid.cells[idx];
          if (!cellContent) continue; // safety check
          
          for (let j = 0; j < cellContent.length; j++) {
            const b = cellContent[j];
            if (a === b) continue;

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;

            if (distSq > 0 && distSq < config.MAX_DISTANCE * config.MAX_DISTANCE) {
              const dist = Math.sqrt(distSq);
              const nx = dx / dist;
              const ny = dy / dist;

              if (dist < config.MIN_DISTANCE) {
                // Universal short-range cell-wall repulsion
                const forceMagnitude = (1 - dist / config.MIN_DISTANCE) * 3.0; 
                fx += nx * forceMagnitude; 
                fy += ny * forceMagnitude;
              } else {
                // Force calculated dynamically via matrix
                const interactionForce = config.interactionMatrix[a.type][b.type];
                const forceMagnitude = interactionForce * (1 - (dist - config.MIN_DISTANCE) / (config.MAX_DISTANCE - config.MIN_DISTANCE));
                
                fx += -nx * forceMagnitude * config.FORCE_MULTIPLIER;
                fy += -ny * forceMagnitude * config.FORCE_MULTIPLIER;
              }
            }
          }
        }
      }
    }

    a.vx += fx;
    a.vy += fy;
  }
}
