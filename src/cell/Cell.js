export class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    
    // Continuous float velocity
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    
    // 5 particle types for interaction matrix
    this.type = type !== undefined ? type : Math.floor(Math.random() * 5);
    
    // Assign typical particle colors: Red, Green, Blue, Yellow, Purple
    const colors = ['#f44336', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0'];
    this.color = colors[this.type];
    
    this.radius = 3; // Render as small dots
  }

  update(width, height) {
    this.x += this.vx;
    this.y += this.vy;

    // Smooth boundary bouncing
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(this.x, width - this.radius));
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(this.y, height - this.radius));
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
