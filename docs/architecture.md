# Architecture

## Core Components
- **Engine**: Handles the simulation loop, canvas rendering, and timing.
- **World**: Manages all entities (cells, organisms, food) and spatial updates.
- **Cell**: Contains individual cell properties (position, energy, organismId).
- **Organism**: Represents a group of linked cells, moving together and sharing energy.
- **Food**: Resource particles that provide energy to organisms.

## Coordinate System
- **Grid Mesh**: The simulation operates on a fixed-size grid (e.g., 20px squares). All entities have integer coordinates representing grid column and row. Movement is discrete (tile-by-tile) rather than continuous floating points.

## Simulation Loop
1. **Update World**: Process interactions (e.g., cell/food collision).
2. **Handle Merging**: Detect if loose cells or organisms are close enough to merge.
3. **Move Organisms**: Update positions based on organism logic.
4. **Update Energy**: Drain energy passively and add from food; handle cell splits if energy gets low.
