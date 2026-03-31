# Particle Life Architecture

## Concept Overview
The project operates as an ultra-fast, visually impressive, 2D physics-based "Particle Life" simulation. Independent atom particles traverse the field mapped by conditionally complex attraction and repulsion forces, building distinct organic, moving biological shapes in real-time natively on standard web hardware.

## Optimization Blueprint
Instead of utilizing generic iteration (which breaks CPU capacity around $N = 1000$), the backend abstracts every `(x, y)` vector directly onto a **Spatial Partitioning Engine**. Physics interactions bypass processing anything unrelated, guaranteeing $O(N)$ runtime behaviors localized dynamically exactly equivalent to whatever UI constraints the user applies to maximum effective distances.

## Core Component Modules
- **Engine**: Handles the continuous rendering loop hook wrapper via standard API.
- **World**: Hosts all active `Cell` elements and instantiates coordinate mapping updates each frame.
- **Cell**: Visual geometric primitive atom bounding absolute forces internally via its `x,y,vx,vy`.
- **SpatialGrid**: The performance secret utilizing generic array lengths dynamically resized to bin geometric particle data each frame smoothly simulating bucket bounds mathematically via `idx = col + row * cols`.

## HUD DOM
Native UI manipulation rests natively above the JS physics sandbox in a traditional Z-Index flexbox overlay containing direct bindings matching UI inputs to runtime configuration floats. This is visually rendered with subtle backdrop filtering and translucent borders.
