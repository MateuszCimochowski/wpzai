import { describe, it, expect } from 'vitest';
import { applyInteractions, interactionMatrix } from '../src/interactions.js';
import { Cell } from '../src/cell/Cell.js';

describe('Particle Force Interactions', () => {
  it('should apply attractive force correctly', () => {
    // Green (1) attracts Red (0).
    const red = new Cell(10, 10, 0);
    const green = new Cell(20, 10, 1);
    red.vx = 0; red.vy = 0;
    green.vx = 0; green.vy = 0;
    
    expect(interactionMatrix[0][1]).toBeGreaterThan(0); // Red is attracted to Green
    
    const particles = [red, green];
    applyInteractions(particles);
    
    // Red cell should gain positive horizontal velocity moving towards Green (x: 20 -> right)
    expect(red.vx).toBeGreaterThan(0);
  });
  
  it('should apply repulsion force correctly', () => {
    // Green (1) repels Green (1)
    const greenA = new Cell(10, 10, 1);
    const greenB = new Cell(20, 10, 1);
    greenA.vx = 0; greenA.vy = 0;
    greenB.vx = 0; greenB.vy = 0;
    
    expect(interactionMatrix[1][1]).toBeLessThan(0); // Repulsion
    
    const particles = [greenA, greenB];
    applyInteractions(particles);
    
    // Green A should gain negative horizontal velocity moving away from Green B (x: 20 -> left)
    expect(greenA.vx).toBeLessThan(0);
    
    // Green B should gain positive horizontal velocity moving away from Green A (x: 10 -> right)
    expect(greenB.vx).toBeGreaterThan(0);
  });
  
  it('should apply zero interaction force based on matrix', () => {
    // Blue (2) ignores Red (0)   ->   Matrix [2][0] == 0.0
    const blue = new Cell(10, 10, 2);
    const red = new Cell(20, 10, 0);
    blue.vx = 0; blue.vy = 0;
    red.vx = 0; red.vy = 0;
    
    expect(interactionMatrix[2][0]).toBe(0); // Ignores
    
    const particles = [blue, red];
    applyInteractions(particles);
    
    expect(blue.vx).toBe(0);
    expect(blue.vy).toBe(0);
  });
});
