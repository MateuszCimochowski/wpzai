import { Cell } from '../cell/Cell.js';
import { applyInteractions, config } from '../interactions.js';
import { SpatialGrid } from './SpatialGrid.js';

export class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.cells = [];
    this.spatialGrid = new SpatialGrid(width, height, config.MAX_DISTANCE);
    
    // Start with higher mass amount since physics engines handle it smooth now.
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
    // Dynamically resize grid if Slider overrides happen.
    this.spatialGrid.resize(this.width, this.height, config.MAX_DISTANCE);
    this.spatialGrid.clear();

    // Map all alive cells inside the grid sequentially
    for (const cell of this.cells) {
      this.spatialGrid.insert(cell);
    }

    // Process vectors utilizing accelerated lookup bounds
    applyInteractions(this.cells, this.spatialGrid);
    
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
