import { describe, it, expect } from 'vitest';
import { Cell } from '../src/cell/Cell.js';

describe('Particle Velocity Logic', () => {
  it('should update position based on velocity', () => {
    const particle = new Cell(100, 100);
    particle.vx = 2;
    particle.vy = -3;
    
    particle.update(800, 600);
    
    expect(particle.x).toBe(102);
    expect(particle.y).toBe(97);
  });
  
  it('should bounce off boundaries and invert velocity', () => {
    const particle = new Cell(5, 100);
    particle.radius = 10;
    particle.vx = -10; // Will cause it to go to x: -5
    particle.vy = 0;
    
    particle.update(800, 600);
    
    expect(particle.vx).toBe(10); // inverted
    expect(particle.x).toBeGreaterThanOrEqual(10); // clamped to radius
  });
});
