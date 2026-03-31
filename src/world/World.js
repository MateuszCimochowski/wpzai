import { Cell } from '../cell/Cell.js';
import { applyInteractions, config } from '../interactions.js';

export class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.cells = [];
    
    // Initialize 1000 generic particles 
    this.initCells(1000);
  }

  restart(count) {
    this.cells = [];
    this.initCells(count);
  }

  initCells(count) {
    for (let i = 0; i < count; i++) {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        this.cells.push(new Cell(x, y));
    }
  }

  update() {
    applyInteractions(this.cells);
    
    for (const cell of this.cells) {
      cell.vx *= config.FRICTION;
      cell.vy *= config.FRICTION;
      
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
