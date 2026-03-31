export class Cell {
  constructor(x, y) {
    this.x = x; // Grid X coordinate
    this.y = y; // Grid Y coordinate
    
    // Movement restricted to 4 directions
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const randomDir = dirs[Math.floor(Math.random() * dirs.length)];
    this.vx = randomDir[0];
    this.vy = randomDir[1];
    
    this.color = '#4CAF50';
    this.energy = 100;
    this.organismId = null;
  }

  // Manhattan distance for mesh grid
  distanceTo(otherCell) {
    return Math.abs(this.x - otherCell.x) + Math.abs(this.y - otherCell.y);
  }

  update(cols, rows) {
    const nextX = this.x + this.vx;
    const nextY = this.y + this.vy;

    // Bounce off grid bounds
    if (nextX < 0 || nextX >= cols) {
      this.vx *= -1;
    } else {
      this.x = nextX;
    }

    if (nextY < 0 || nextY >= rows) {
      this.vy *= -1;
    } else {
      this.y = nextY;
    }
  }

  draw(ctx, gridSize) {
    ctx.fillStyle = this.color;
    // Draw slightly smaller to see grid lines around cells
    ctx.fillRect(this.x * gridSize + 1, this.y * gridSize + 1, gridSize - 2, gridSize - 2);
  }
}
