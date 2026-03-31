export class Engine {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = world;
    this.isRunning = false;
    this.lastTime = performance.now();
    this.tickInterval = 150; // ms per grid jump
    this.timeAccumulator = 0;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  stop() {
    this.isRunning = false;
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    this.timeAccumulator += deltaTime;

    // Logic updates on fixed tick for discrete grid movement
    if (this.timeAccumulator >= this.tickInterval) {
      this.timeAccumulator = 0;
      this.world.update();
    }

    // Always clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render wireframe grid and world
    this.drawGrid();
    this.world.draw(this.ctx);

    requestAnimationFrame((t) => this.loop(t));
  }

  drawGrid() {
    const { width, height, gridSize } = this.world;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();
  }
}
