# Particle Life Architecture

## Concept Overview
The project has shifted entirely from a grid-based biological colony sim to a physics-based "Particle Life" interaction sandbox.
Instead of cells consuming energy to split, independent particles apply complex attraction and repulsion forces on one another based on conditional matrices, yielding emergent artificial life clusters.

## Core Components
- **Engine**: Handles the continuous smooth rendering loop (`requestAnimationFrame`) for updating and painting the canvas.
- **World**: Maintains a bulk array of particles. Will soon serve as the host for calculating distance maps between all interaction pairs per frame.
- **Cell (Particle)**: A foundational atom with a designated `type` identifier (0, 1, or 2). Retains tracking of `x`, `y`, `vx`, `vy` and responds to bounding constraint bounces.

## Interaction Mechanics (Upcoming Features)
Particle forces will be calculated from a predefined matrix:
- Positive Values → Attraction
- Negative Values → Repulsion
- Zero Values → Indifferent

Particles update their `vx` and `vy` dynamically by referencing the distance vector relative to their neighbor, normalized and scaled by the interaction coefficient matching their specific types.
