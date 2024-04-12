import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-neurona',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './neurona.component.html',
  styles: ``,
})
export class NeuronaComponent { 
  @ViewChild('Neurona', { static: false }) canvasRef!: ElementRef;

  Draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white'; // Establece el color de trazo
    ctx.fillStyle = 'white'; //Establece el color de relleno

    for (let i = 0; i < this.variables.entradas; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    console.log('data', this.variables.data);

    for (let i = 0; i < this.variables.salidas; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    // Conecta cada esfera de entrada con cada esfera de salida
    for (let i = 0; i < this.variables.entradas; i++) {
      for (let j = 0; j < this.variables.salidas; j++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 * (i + 1)); // Punto de inicio en la esfera de entrada
        ctx.lineTo(150, 50 * (j + 1)); // Punto final en la esfera de salida
        ctx.stroke(); // Dibuja la línea
      }
    }
  }
}
