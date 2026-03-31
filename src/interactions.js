// Interaction Matrix defining attraction (positive) and repulsion (negative)
// Types: 0 (Red), 1 (Green), 2 (Blue)
export const interactionMatrix = [
  [-0.5, 0.5, 0.0], // Red attracts Green, repels Red, ignores Blue
  [0.5, -0.5, 0.5], // Green attracts Red & Blue, repels Green
  [0.0, 0.5, -0.5]  // Blue attracts Green, repels Blue, ignores Red
];

export const MAX_DISTANCE = 80;
export const MIN_DISTANCE = 5; // Prevents infinite forces at zero distance
export const FORCE_MULTIPLIER = 2.0;
export const FRICTION = 0.85; // Damping applied every frame

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

      if (distSq > 0 && distSq < MAX_DISTANCE * MAX_DISTANCE) {
        const dist = Math.sqrt(distSq);
        const safeDist = Math.max(dist, MIN_DISTANCE);
        
        // Normalize vector from B to A
        const nx = dx / safeDist;
        const ny = dy / safeDist;

        // Positive matrix value represents attraction (moves A towards B => negative adjustment to B->A vector)
        // Negative matrix value represents repulsion (moves A away from B => positive adjustment)
        const interactionForce = interactionMatrix[a.type][b.type];
        
        // Decrease force smoothly as distance reaches MAX_DISTANCE
        const forceMagnitude = interactionForce * (1 - safeDist / MAX_DISTANCE);
        
        fx += -nx * forceMagnitude * FORCE_MULTIPLIER;
        fy += -ny * forceMagnitude * FORCE_MULTIPLIER;
      }
    }

    a.vx += fx;
    a.vy += fy;
  }
}
