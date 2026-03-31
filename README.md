# Particle Life Simulator

Welcome to the **Particle Life Simulator**! This is a fascinating physics sandbox where simple mathematical rules of attraction and repulsion applied to colored dots give rise to incredibly complex, organic, and life-like emergent behaviors.

## How to Play
When you launch the simulation using `npm run dev`, you'll see a dark glassmorphic UI panel on the right side of the screen. This is your control room for playing God with the digital biology.

1. **Particle Count**: The number of basic atoms in the simulation. Start at `1000` to experiment, and arbitrarily crank it up to `5000` or even `10000` for massive swarms!
2. **Force Multiplier**: Think of this as the "temperature" or "energy" of the system. High multipliers make particles zip around aggressively; low multipliers create slow, sluggish growth.
3. **Friction**: How quickly particles lose momentum. Lower friction (`0.70`) results in wild orbits and spring-like bounces. Higher friction (`0.95`) forces particles to lock tightly into place.
4. **Max Distance**: The sensory range of each particle. Longer distances mean macroscopic structures form, but they might pull together into a singular blob.

### The 5x5 DNA Matrix
The grid of 25 sliders at the bottom is the "DNA" of your simulation. 
- A **Positive slider (Right)** means the Row Color is *Attracted* to the Column Color.
- A **Negative slider (Left)** means the Row Color is *Repelled* by the Column Color.
- A **0 slider (Middle)** means they ignore each other.

By mixing and matching these traits, you can inadvertently create snakes, reproducing cells, wandering amoebas, and crystallized structures.

---

## 🔬 Top 3 Best Settings for Interesting Creatures

Try manually pulling these recipes into your sliders to witness completely different forms of artificial life!

### 1. "The Glider Snakes"
This configuration creates long, slithering snakes of particles that infinitely chase their own tails, leaving trails of specific colors in their wake.
- **Force Multiplier**: `2.0`
- **Friction**: `0.85`
- **Max Distance**: `80`
- **Matrix Rules**:
  - `Red` -> Attracted strongly to `Green` (1.0), Repelled by `Red` (-1.0)
  - `Green` -> Attracted strongly to `Blue` (1.0), Repelled by `Green` (-1.0)
  - `Blue` -> Attracted strongly to `Red` (1.0), Repelled by `Blue` (-1.0)
  - *Keep Yellow and Purple neutral (0.0).*
  *(This generic A chases B chases C chases A loop is the foundation of motion in Particle Life!)*

### 2. "The Breathing Cells"
This setting generates distinct, circular "cells" with a nucleus of one color encased in a protective membrane of another color. They will bounce off each other like squishy balloons.
- **Force Multiplier**: `1.5`
- **Friction**: `0.80`
- **Max Distance**: `60`
- **Matrix Rules**:
  - `Red (Nucleus)` -> Attracts `Red` (1.0), Attracts `Green` (1.0)
  - `Green (Membrane)` -> Attracts `Red` (0.8), Repels `Green` (-0.5), Repels `Blue` (-1.0)
  - `Blue (Water)` -> Attracts `Blue` (0.5), Repels `Green` (-0.8)
  - *Make Yellow and Purple repel everything intensely to act as a hostile environment.*

### 3. "The Crystal Formations"
If you prefer static, geometric beauty over chaotic motion, this setup forces the particles into rigid, vibrating lattices.
- **Force Multiplier**: `3.0`
- **Friction**: `0.95` (Very high damping limits fluid motion)
- **Max Distance**: `40` (Short interaction range keeps bonds tight)
- **Matrix Rules**:
  - Set *every single slider* to positive `1.0` (Maximum Attraction).
  Normally this would cause particles to collapse into a black hole—but because the engine utilizes a microscopic "Universal Repulsion Force" at `< 15px`, maxing out the attraction on everything will cause the particles to snap into perfectly spaced, vibrating cluster grids!

---
> **Bored?** Just smash the `Randomize Physics` button and let the matrix surprise you with brand-new species! 
