export class Engine {
  constructor(canvas, world) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = world;
    this.isRunning = false;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  stop() {
    this.isRunning = false;
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    this.world.update();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.world.draw(this.ctx);

    requestAnimationFrame((t) => this.loop(t));
  }
}
