import { describe, it, expect } from 'vitest';
import { World } from '../src/world/World.js';
import { Cell } from '../src/cell/Cell.js';

describe('Merging Logic on Grid Mesh', () => {
  it('should create an organism when two loose cells are adjacent', () => {
    const world = new World(800, 600);
    world.cells = [];
    world.organisms = [];
    
    const cellA = new Cell(10, 10);
    const cellB = new Cell(10, 11);
    cellA.vx = 0; cellA.vy = 0;
    cellB.vx = 0; cellB.vy = 0;
    
    world.cells.push(cellA);
    world.cells.push(cellB);
    
    world.handleMerging();
    
    expect(world.organisms.length).toBe(1);
    expect(cellA.organismId).toBe(1);
    expect(cellB.organismId).toBe(1);
    expect(world.organisms[0].cells.length).toBe(2);
  });

  it('should not merge cells that are far apart', () => {
    const world = new World(800, 600);
    world.cells = [];
    world.organisms = [];
    
    const cellA = new Cell(10, 10);
    const cellB = new Cell(15, 15);
    cellA.vx = 0; cellA.vy = 0;
    cellB.vx = 0; cellB.vy = 0;
    
    world.cells.push(cellA);
    world.cells.push(cellB);
    
    world.handleMerging();
    
    expect(world.organisms.length).toBe(0);
    expect(cellA.organismId).toBeNull();
  });
  
  it('should add loose cell to existing organism', () => {
    const world = new World(800, 600);
    world.cells = [];
    world.organisms = [];
    
    const cellA = new Cell(10, 10);
    const cellB = new Cell(10, 11); 
    cellA.vx = 0; cellA.vy = 0;
    cellB.vx = 0; cellB.vy = 0;
    
    world.cells.push(cellA);
    world.cells.push(cellB);
    
    world.handleMerging();
    expect(world.organisms.length).toBe(1);
    
    const cellC = new Cell(10, 12); 
    cellC.vx = 0; cellC.vy = 0;
    
    world.cells.push(cellC);
    world.handleMerging();
    
    expect(world.organisms.length).toBe(1);
    expect(world.organisms[0].cells.length).toBe(3);
    expect(cellC.organismId).toBe(world.organisms[0].id);
  });
});
