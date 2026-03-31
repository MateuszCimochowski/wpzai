# Progress Log

## Step 1: Initialization (Completed)
- Created project using Vite.
- Set up core directory structure (`/src`, `/tests`, `/docs`).
- Created documentation files (`progress.md`, `tasks.md`, `architecture.md`).
- Canvas rendering setup complete.
- Implemented a few moving cells (no merging yet).

## Step 2: Core Mechanics (Completed)
- Created Organism class to group cells together.
- Implemented distance calculation and auto-merging in World update loop.
- Organisms now move as a single unit and bounce off boundaries together.
- Added Vitest tests for merging logic.

## Step 2.5: Grid Mesh Migration (Completed)
- Migrated continuous 2D coordinate system (`vx`/`vy`) to a discrete tile-grid.
- Re-styled cells and organisms as pixel squares aligned to the mesh.
- Implemented background wireframe rendering in Engine loop.
- Updated merge distance to calculate pure Manhattan adjacency.
- Refactored bounds bouncing to guarantee exact grid alignment.


