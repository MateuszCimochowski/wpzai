# Particle Life Simulator - Project Overview & Agent Handoff

## Project State
This project was recently refactored from a grid-based "Cell Colony Simulator" into a continuous physics-based **Particle Life Simulator**. 
The repository is fully configured and bundled using Vite and Vanilla JS.

## Core Architecture
- **Rendering (`src/engine/Engine.js`)**: HTML5 Canvas rendering a 2D space, updated via an un-ticked, smooth `requestAnimationFrame` loop.
- **Particles (`src/cell/Cell.js`)**: Independent dots with a continuous `(x, y)` position and `(vx, vy)` float velocity. They belong to one of 3 arbitrary types: 0 (Red), 1 (Green), or 2 (Blue).
- **Physics (`src/interactions.js`)**: Contains the `interactionMatrix` that dictates attraction (positive) and repulsion (negative) forces between the three types. Particles calculate euclidean distances to every other particle in `O(N^2)` time and adjust velocities smoothly using a distance falloff and a `FRICTION` damping coefficient.
- **World (`src/world/World.js`)**: Orchestrates the loop updates by applying physical interactions to all particles en masse, processing top speed limits, and bouncing off the designated canvas boundaries.
- **Testing (`tests/`)**: Configured with Vitest. Contains fully passing unit tests for boundary logic verification and force interaction validation.

## Next Target for the Following Agent
The user wants to add an interactive **UI Control Panel**. 

**Your Goal:**
Build a user interface structured natively in the HTML/CSS (overlaying the Canvas) that features **Sliders** to manipulate the properties of the particles in real-time, enabling the user to change organic patterns manually.

**Technical Requirements:**
1. **Interaction Matrix UI**: Add sliders to dynamically modify the respective indices within the `interactionMatrix` matrix in `src/interactions.js` (e.g., Red-Green attraction level, Blue-Blue repulsion level).
2. **Global Physics Tweaking**: Add sliders to adjust global tuning variables to observe radical system changes:
   - `FORCE_MULTIPLIER`
   - `FRICTION` (Damping)
   - `MAX_DISTANCE`
3. **Refactor Constants**: Export the physics constants in `interactions.js` using `let` instead of `const` (or wrap them in a singular globally exported configuration state object) so they can be mutated in real time by the DOM inputs.
4. **Design Quality**: Ensure the interface is styled smoothly using standard CSS in `src/style.css`, adopting a dark-mode, glass-like aesthetic that matches the premium visual quality of the simulation backing it.
