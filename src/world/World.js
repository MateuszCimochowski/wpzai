import { Cell } from '../cell/Cell.js';
import { applyInteractions, FRICTION } from '../interactions.js';

export class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    // Temporarily keeping the name 'cells', will refactor to particles later
    this.cells = [];
    
    // Initialize 300 random particles
    this.initCells(300);
  }

  initCells(count) {
    for (let i = 0; i < count; i++) {
        // Use continuous coords
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        this.cells.push(new Cell(x, y));
    }
  }

  update() {
    // 1. Calculate force vectors based on matrix and proximity
    applyInteractions(this.cells);
    
    // 2. Process physical attributes: friction, speed caps, and spatial updates
    for (const cell of this.cells) {
      // Apply damping / friction
      cell.vx *= FRICTION;
      cell.vy *= FRICTION;
      
      // Limit absolute top speed
      const speedSq = cell.vx * cell.vx + cell.vy * cell.vy;
      const MAX_SPEED = 10;
      if (speedSq > MAX_SPEED * MAX_SPEED) {
        const speed = Math.sqrt(speedSq);
        cell.vx = (cell.vx / speed) * MAX_SPEED;
        cell.vy = (cell.vy / speed) * MAX_SPEED;
      }

      cell.update(this.width, this.height);
    }
  }

  draw(ctx) {
    for (const cell of this.cells) {
      cell.draw(ctx);
    }
  }
}
