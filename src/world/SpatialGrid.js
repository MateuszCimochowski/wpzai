export class SpatialGrid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    
    // Using a 1D array to represent 2D grid for better memory locality
    this.cells = new Array(this.cols * this.rows);
    this.clear(); // Initialize empty arrays
  }

  resize(width, height, cellSize) {
    if (this.width !== width || this.height !== height || this.cellSize !== cellSize) {
      this.width = width;
      this.height = height;
      
      // Ensure cell size is at least 1 to avoid infinity cols/rows
      this.cellSize = Math.max(cellSize, 1); 
      
      this.cols = Math.ceil(this.width / this.cellSize);
      this.rows = Math.ceil(this.height / this.cellSize);
      
      this.cells = new Array(this.cols * this.rows);
    }
  }

  clear() {
    for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i]) {
            this.cells[i].length = 0; // Clear without reallocating
        } else {
            this.cells[i] = [];
        }
    }
  }

  insert(particle) {
    let col = Math.floor(particle.x / this.cellSize);
    let row = Math.floor(particle.y / this.cellSize);

    // Keep insertions clamped safely inside grid
    if (col < 0) col = 0;
    if (col >= this.cols) col = this.cols - 1;
    if (row < 0) row = 0;
    if (row >= this.rows) row = this.rows - 1;

    const idx = col + row * this.cols;
    if (!this.cells[idx]) this.cells[idx] = []; // fallback lazy init
    this.cells[idx].push(particle);
  }
}
