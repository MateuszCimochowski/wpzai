import './style.css';
import { World } from './world/World.js';
import { Engine } from './engine/Engine.js';
import { config, randomizeMatrix } from './interactions.js';

function init() {
  const canvas = document.getElementById('simCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const world = new World(canvas.width, canvas.height);
  const engine = new Engine(canvas, world);
  
  engine.start();

  // Setup DOM Bindings 
  setupUI(world);
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.width = canvas.width;
    world.height = canvas.height;
  });
}

function setupUI(world) {
  const bindSlider = (id, obj, key, valElId, isMatrix = false, i = 0, j = 0) => {
    const el = document.getElementById(id);
    const valEl = document.getElementById(valElId);
    
    if (isMatrix) el.value = config.interactionMatrix[i][j];
    else el.value = obj[key];
    
    if (valEl) valEl.innerText = el.value;

    el.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      if (isMatrix) config.interactionMatrix[i][j] = v;
      else obj[key] = v;
      if (valEl) valEl.innerText = v;
    });
  };

  bindSlider('forceMultiplier', config, 'FORCE_MULTIPLIER', 'forceVal');
  bindSlider('friction', config, 'FRICTION', 'frictionVal');
  bindSlider('maxDistance', config, 'MAX_DISTANCE', 'distVal');

  for(let i=0; i<5; i++) {
    for(let j=0; j<5; j++) {
      bindSlider(`m${i}${j}`, null, null, null, true, i, j);
    }
  }

  const pCount = document.getElementById('particleCount');
  const countVal = document.getElementById('countVal');
  pCount.addEventListener('input', (e) => {
    countVal.innerText = e.target.value;
  });
  pCount.addEventListener('change', (e) => {
    world.restart(parseInt(e.target.value));
  });

  const randBtn = document.getElementById('randomizeBtn');
  randBtn.addEventListener('click', () => {
    randomizeMatrix();
    // Update active UI sliders
    for(let i=0; i<5; i++) {
      for(let j=0; j<5; j++) {
        document.getElementById(`m${i}${j}`).value = config.interactionMatrix[i][j].toFixed(2);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
