import { Cell } from '../cell/Cell.js';
import { Organism } from '../organism/Organism.js';

export class World {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gridSize = 20; // 20px per mesh square
    this.cols = Math.floor(this.width / this.gridSize);
    this.rows = Math.floor(this.height / this.gridSize);
    
    this.cells = [];
    this.organisms = [];
    this.nextOrganismId = 1;
    
    // Merge if Manhattan distance is 1 (adjacent tile)
    this.mergeDistance = 1;
    
    this.initCells(50);
  }

  initCells(count) {
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * this.cols);
      const y = Math.floor(Math.random() * this.rows);
      this.cells.push(new Cell(x, y));
    }
  }

  update() {
    this.handleMerging();

    for (const cell of this.cells) {
      if (cell.organismId === null) {
        cell.update(this.cols, this.rows);
      }
    }

    for (const org of this.organisms) {
      org.update(this.cols, this.rows);
    }
  }

  handleMerging() {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = i + 1; j < this.cells.length; j++) {
        const cellA = this.cells[i];
        const cellB = this.cells[j];

        if (cellA.distanceTo(cellB) === this.mergeDistance) { // strictly adjacent tiles
          if (cellA.organismId === null && cellB.organismId === null) {
            const org = new Organism(this.nextOrganismId++);
            org.addCell(cellA);
            org.addCell(cellB);
            this.organisms.push(org);
          }
          else if (cellA.organismId !== null && cellB.organismId === null) {
            const org = this.organisms.find(o => o.id === cellA.organismId);
            org.addCell(cellB);
          }
          else if (cellB.organismId !== null && cellA.organismId === null) {
            const org = this.organisms.find(o => o.id === cellB.organismId);
            org.addCell(cellA);
          }
          else if (cellA.organismId !== null && cellB.organismId !== null && cellA.organismId !== cellB.organismId) {
            const orgA = this.organisms.find(o => o.id === cellA.organismId);
            const orgB = this.organisms.find(o => o.id === cellB.organismId);
            if (orgA && orgB) {
              orgA.mergeWith(orgB);
              this.organisms = this.organisms.filter(o => o.id !== orgB.id);
            }
          }
        }
      }
    }
  }

  draw(ctx) {
    for (const cell of this.cells) {
      if (cell.organismId === null) {
        cell.draw(ctx, this.gridSize);
      }
    }
    for (const org of this.organisms) {
      org.draw(ctx, this.gridSize);
    }
  }
}
