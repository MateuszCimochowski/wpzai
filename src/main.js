import './style.css';
import { World } from './world/World.js';
import { Engine } from './engine/Engine.js';

function init() {
  const canvas = document.getElementById('simCanvas');
  
  // Set dimensions (maybe dynamic later, fixed for now to represent a petri dish)
  canvas.width = 800;
  canvas.height = 600;

  const world = new World(canvas.width, canvas.height);
  const engine = new Engine(canvas, world);

  engine.start();
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', init);
