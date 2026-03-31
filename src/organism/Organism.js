export class Organism {
  constructor(id) {
    this.id = id;
    this.cells = [];
    
    // Choose a random grid movement direction
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const randomDir = dirs[Math.floor(Math.random() * dirs.length)];
    this.vx = randomDir[0];
    this.vy = randomDir[1];
  }

  addCell(cell) {
    this.cells.push(cell);
    cell.organismId = this.id;
  }

  mergeWith(otherOrganism) {
    for (const cell of otherOrganism.cells) {
      this.addCell(cell);
    }
  }

  update(cols, rows) {
    let hitWallX = false;
    let hitWallY = false;
    
    // Check boundaries for all cells
    for (const cell of this.cells) {
      const nextX = cell.x + this.vx;
      const nextY = cell.y + this.vy;
      
      if (nextX < 0 || nextX >= cols) hitWallX = true;
      if (nextY < 0 || nextY >= rows) hitWallY = true;
    }

    if (hitWallX) this.vx *= -1;
    if (hitWallY) this.vy *= -1;

    for (const cell of this.cells) {
      cell.x += this.vx;
      cell.y += this.vy;
    }
  }

  draw(ctx, gridSize) {
    // Draw links between organism cells
    if (this.cells.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.cells[0].x * gridSize + gridSize / 2, this.cells[0].y * gridSize + gridSize / 2);
      for (let i = 1; i < this.cells.length; i++) {
        ctx.lineTo(this.cells[i].x * gridSize + gridSize / 2, this.cells[i].y * gridSize + gridSize / 2);
      }
      ctx.lineTo(this.cells[0].x * gridSize + gridSize / 2, this.cells[0].y * gridSize + gridSize / 2);
      ctx.strokeStyle = '#8BC34A';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    for (const cell of this.cells) {
      cell.draw(ctx, gridSize);
    }
  }
}
