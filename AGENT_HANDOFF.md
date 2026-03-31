# Particle Life Simulator - Multi-Agent Documentation

## Warning to the Next Agent
**DO NOT REVERT TO O(N^2) NESTED LOOPS OR A CONTINUOUS GRID**. The system has been specifically engineered to utilize a high-performance **Spatial Partitioning Grid (Bin Lattice)**. Changing the core physics calculations back to mapping every particle against every other particle will severely crash the framerate when processing over `10,000` entities. Do not rewrite `interactions.js` logic loops into linear loops!

## Core Architecture
- **Rendering (`src/engine/Engine.js`)**: HTML5 Canvas rendering a 2D space, updated via an un-ticked, smooth `requestAnimationFrame` loop.
- **Particles (`src/cell/Cell.js`)**: Independent dots initialized with continuous `(x, y)` floats and `(vx, vy)` velocity forces. They utilize a simple collision bounce constraint at the edges of the canvas boundaries. They are assigned 1 of 5 color types: `0 (Red)`, `1 (Green)`, `2 (Blue)`, `3 (Yellow)`, or `4 (Purple)`.
- **Physics (`src/interactions.js`)**: Contains the cross-type `interactionMatrix` (a 5x5 nested array) dictating whether the 5 types repel or attract each other out to a bound of `MAX_DISTANCE`. Features **Universal Short-Range Repulsion** where any particle natively repels extremely hard at `< 15px` to simulate a dense bacterial "cell wall" regardless of what the matrix tells it to do.
- **Spatial Grid Optimization (`src/world/SpatialGrid.js`)**: A one-dimensional float array emulating a 2D bucket system. Cell buckets resize precisely based on `MAX_DISTANCE`. Particle positions map mathematically into index buckets dynamically every frame. When fetching neighbor distance checks out to `MAX_DISTANCE`, each respective particle explicitly loops **only** its resident bucket alongside the 8 surrounding buckets directly localized near it to save lookup overhead. 
- **World Integrator (`src/world/World.js`)**: Reinstantiates the `SpatialGrid` map boundaries dynamically adjusting if `config.MAX_DISTANCE` updates natively. Populates the `this.cells` array through the index mappings each loop.
- **Controls & HUD (`index.html`, `src/style.css`, `src/main.js`)**: Natively bounds realtime HTML sliders onto the central `config` mutable matrix overlaying the physics. Ranges include `Particle Count` up to `10,000`, `Force Multiplier`, 25 independent matrix sliders (ranged `-1.0` to `1.0`), and explicit layout randomization hooks visually mapped over a classic dark glassmorphic scheme.

## Known Stable Limits
10,000 Particles execute seamlessly via the Bin Lattice acceleration model on a vanilla Chromium DOM. Read the user's prompt carefully to proceed with their next exact instructions without wiping this physics baseline.
