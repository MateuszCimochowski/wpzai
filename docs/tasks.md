# Refactoring to Particle Life Simulator

## Step 1: Base Mechanics (Completed)
- [x] Disable organism/merging logic and remove specific files
- [x] Remove old grid constraints and grid tick loop from engine
- [x] Introduce continuous float velocity (vx, vy) to cells
- [x] Restore boundary bouncing logic
- [x] Change visualization to Type-based color circles (Red, Green, Blue)
- [x] Remove old tests and add velocity update tests

## Step 2: Interaction Rules (Completed)
- [x] Create interaction matrix constants
- [x] Implement distance calculation loop between particles
- [x] Apply attraction/repulsion forces based on distance and type
- [x] Apply friction/damping to velocities
- [x] Update Engine and World to integrate physics

## Phase 3: Interactive UI Control Panel (Completed)
- [x] Adapt physics files with mutable global `config` references
- [x] Implement Universal `<15px` Short-Range Repulsion logic
- [x] Setup HTML glass layer overlay and styled inputs
- [x] Bind javascript DOM selectors iteratively across interaction scales
- [x] Enable realtime particle count reset injection
