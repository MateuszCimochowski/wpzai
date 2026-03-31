import { describe, it, expect } from 'vitest';
import { SpatialGrid } from '../src/world/SpatialGrid.js';
import { Cell } from '../src/cell/Cell.js';

describe('Spatial Grid Logic', () => {
  it('should initialize dynamic properties appropriately', () => {
    const grid = new SpatialGrid(800, 600, 100);
    // 800 / 100 = 8 cols. 600 / 100 = 6 rows.
    expect(grid.cols).toBe(8);
    expect(grid.rows).toBe(6);
  });

  it('should accurately place particles inside the index map', () => {
    const grid = new SpatialGrid(800, 600, 100);
    
    // x=150, y=250 -> col: 1, row: 2.
    // idx = 1 + 2 * 8 = 17
    const particle = new Cell(150, 250, 0);
    grid.insert(particle);
    
    expect(grid.cells[17].length).toBe(1);
    expect(grid.cells[17][0]).toBe(particle);
  });

  it('should clear efficiently', () => {
    const grid = new SpatialGrid(800, 600, 100);
    const particle = new Cell(10, 10, 0);
    grid.insert(particle);
    
    expect(grid.cells[0].length).toBe(1);
    grid.clear();
    expect(grid.cells[0].length).toBe(0);
  });

  it('should clamp bounds outside grid securely', () => {
    const grid = new SpatialGrid(800, 600, 100);
    const particle = new Cell(-500, 9999, 0);
    
    grid.insert(particle);
    // Expected bounds: col 0, row 5 => idx = 0 + 5 * 8 = 40.
    expect(grid.cells[40].length).toBe(1);
  });
});
