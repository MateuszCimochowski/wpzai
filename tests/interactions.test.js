import { describe, it, expect } from 'vitest';
import { applyInteractions, config } from '../src/interactions.js';
import { SpatialGrid } from '../src/world/SpatialGrid.js';
import { Cell } from '../src/cell/Cell.js';

describe('Particle Force Interactions using SpatialGrid', () => {
  it('should apply universal short-range repulsion correctly via Grid Lookup', () => {
    const red = new Cell(10, 10, 0);
    const green = new Cell(15, 10, 1);
    red.vx = 0; red.vy = 0;
    green.vx = 0; green.vy = 0;
    
    config.interactionMatrix[0][1] = 1.0; 
    
    // Inject Grid
    const grid = new SpatialGrid(800, 600, config.MAX_DISTANCE);
    grid.insert(red);
    grid.insert(green);
    
    const particles = [red, green];
    applyInteractions(particles, grid);
    
    expect(red.vx).toBeLessThan(0);
  });

  it('should apply attractive force based on matrix via Grid', () => {
    const red = new Cell(10, 10, 0);
    const green = new Cell(40, 10, 1); 
    red.vx = 0; red.vy = 0;
    green.vx = 0; green.vy = 0;
    
    config.interactionMatrix[0][1] = 1.0;
    
    const grid = new SpatialGrid(800, 600, config.MAX_DISTANCE);
    grid.insert(red);
    grid.insert(green);

    const particles = [red, green];
    applyInteractions(particles, grid);
    
    expect(red.vx).toBeGreaterThan(0);
  });
});
