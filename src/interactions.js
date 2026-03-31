export const config = {
  // Preset matrix for interesting clusters / bacteria-like shapes
  interactionMatrix: [
    [0.2, 0.5, -0.3], 
    [-0.5, 0.8, -0.1],
    [0.1, -0.4, 0.4]
  ],
  MAX_DISTANCE: 80,
  MIN_DISTANCE: 15, // Universal short-range repulsion boundary
  FORCE_MULTIPLIER: 1.0,
  FRICTION: 0.85
};

export function randomizeMatrix() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      config.interactionMatrix[i][j] = (Math.random() - 0.5) * 2; // Range -1.0 to 1.0
    }
  }
}

export function applyInteractions(particles) {
  for (let i = 0; i < particles.length; i++) {
    let fx = 0;
    let fy = 0;
    const a = particles[i];

    for (let j = 0; j < particles.length; j++) {
      if (i === j) continue;
      const b = particles[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > 0 && distSq < config.MAX_DISTANCE * config.MAX_DISTANCE) {
        const dist = Math.sqrt(distSq);
        const nx = dx / dist;
        const ny = dy / dist;

        if (dist < config.MIN_DISTANCE) {
          // Sharp universal short-range repulsion
          const forceMagnitude = (1 - dist / config.MIN_DISTANCE) * 3.0; 
          fx += nx * forceMagnitude; 
          fy += ny * forceMagnitude;
        } else {
          // Matrix interaction based on type outside minimum clamping dist
          const interactionForce = config.interactionMatrix[a.type][b.type];
          const forceMagnitude = interactionForce * (1 - (dist - config.MIN_DISTANCE) / (config.MAX_DISTANCE - config.MIN_DISTANCE));
          
          fx += -nx * forceMagnitude * config.FORCE_MULTIPLIER;
          fy += -ny * forceMagnitude * config.FORCE_MULTIPLIER;
        }
      }
    }

    a.vx += fx;
    a.vy += fy;
  }
}
