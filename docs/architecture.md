# Particle Life Architecture

## Concept Overview
The project operates as an ultra-fast, visually impressive, 2D physics-based "Particle Life" simulation. 5 distinctive atom particles (`Red`, `Green`, `Blue`, `Yellow`, `Purple`) traverse the field mapped by conditionally complex attraction and repulsion forces, building distinct organic, moving biological shapes in real-time natively on standard web hardware.

## Optimization Blueprint
Instead of utilizing generic iteration (which breaks CPU capacity around $N = 1000$), the backend abstracts every `(x, y)` vector directly onto a **Spatial Partitioning Engine**. Physics interactions bypass processing anything unrelated, guaranteeing $O(N)$ runtime spatial behaviors localized dynamically, exactly equivalent to whatever UI constraints the user applies to maximum effective distances. This comfortably handles 10,000+ interactive entities perfectly.

## Core Component Modules
- **Engine**: Handles the continuous rendering loop hook wrapper (`requestAnimationFrame`) via standard canvas API drawing primitives.
- **World**: Hosts all active `Cell` elements and instantiates coordinate mapping insertions to the Spatial Grid each frame.
- **Cell**: Visual geometric primitive atom bounding absolute forces internally via its `x,y,vx,vy`. Categorized dynamically by `type` integer (0-4).
- **SpatialGrid**: The performance secret utilizing generic array lengths dynamically resized to bin geometric particle data each frame smoothly simulating bucket bounds mathematically via `idx = col + row * cols`.
- **Interactions**: Processes physics distance Euclidean math. Applies universal `15px` short-range clamping and then calculates the subsequent 5x5 dynamic Matrix coefficients relying on what type particle `A` and `B` are conditionally.

## HUD DOM Overlay
Native UI manipulation rests natively above the JS physics sandbox in a traditional Z-Index flexbox overlay containing direct bindings matching UI inputs to runtime configuration floats (including a 25-slider grid for the entire interaction matrix rules). This is visually rendered beautifully with subtle backdrop filtering and translucent borders imitating frosted glass over the running canvas simulation.
