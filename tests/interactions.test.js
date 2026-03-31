import { describe, it, expect } from 'vitest';
import { applyInteractions, config } from '../src/interactions.js';
import { Cell } from '../src/cell/Cell.js';

describe('Particle Force Interactions', () => {
  it('should apply universal short-range repulsion correctly', () => {
    const red = new Cell(10, 10, 0);
    const green = new Cell(15, 10, 1); // dist = 5 (< 15 MIN_DISTANCE)
    red.vx = 0; red.vy = 0;
    green.vx = 0; green.vy = 0;
    
    config.interactionMatrix[0][1] = 1.0; // Strongly attracted
    
    const particles = [red, green];
    applyInteractions(particles);
    
    // Despite attraction context, MUST repel because it's in the universal minimum range clamping boundary
    expect(red.vx).toBeLessThan(0);
  });

  it('should apply attractive force based on matrix outside MIN_DISTANCE', () => {
    const red = new Cell(10, 10, 0);
    const green = new Cell(40, 10, 1); // dist = 30
    red.vx = 0; red.vy = 0;
    green.vx = 0; green.vy = 0;
    
    config.interactionMatrix[0][1] = 1.0;
    
    const particles = [red, green];
    applyInteractions(particles);
    
    expect(red.vx).toBeGreaterThan(0);
  });
});
