import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})

export class CanvasComponent {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private animationFrameId: number = 0;
  private readonly characters = 'アァカサタナハマヤャPQRSTUVWXYZ0123456789';
  private readonly fontSize = 15;
  private columns: number = 10
  private columnPositions: number[] = [];

  ngOnInit() {
    this.canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;
    if (this.canvas !== null) {
      this.context = this.canvas.getContext('2d');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.columns = Math.floor(this.canvas.width / this.fontSize);
      this.columnPositions = Array(this.columns).fill(1);
      this.animateMatrix();
    }
  }

  private animateMatrix() {
    if (this.context && this.canvas ) {
      this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#219d51';
      this.context.font = this.fontSize + 'DinaRemaster';
  
      for (let i = 0; i < this.columns; i++) {
        const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        const x = i * this.fontSize;
        const y = this.columnPositions[i] * this.fontSize;
        this.context.fillText(text, x, y);
  
        if (y > this.canvas.height && Math.random() > 0.975) {
          this.columnPositions[i] = 0;
        }
        this.columnPositions[i]++;
      }
      this.animationFrameId = requestAnimationFrame(this.animateMatrix.bind(this));
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
