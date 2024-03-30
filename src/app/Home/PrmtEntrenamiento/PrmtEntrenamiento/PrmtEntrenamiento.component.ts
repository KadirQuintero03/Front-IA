import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-prmt-entrenamiento',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './PrmtEntrenamiento.component.html',
  styleUrl: './PrmtEntrenamiento.component.css',
})

@Injectable({
  providedIn: 'root', // Esto proporciona la instancia globalmente
})

export default class PrmtEntrenamientoComponent {
  entradas: number = 0; //Numero de entradas
  salidas: number = 0; //Numero de salidas
  patrones: number = 0; //Numero de patrones
  data: any; //La Data que se recibe del servidor

  @ViewChild('Neurona', { static: false }) canvasRef!: ElementRef;
  @ViewChild('file_input', { static: false }) fileInputRef!: ElementRef;

  Draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white'; // Establece el color de trazo
    ctx.fillStyle = 'white'; //Establece el color de relleno

    for (let i = 0; i < this.entradas; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }
    console.log('data', this.data);

    for (let i = 0; i < this.salidas; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    // Conecta cada esfera de entrada con cada esfera de salida
    for (let i = 0; i < this.entradas; i++) {
      for (let j = 0; j < this.salidas; j++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 * (i + 1)); // Punto de inicio en la esfera de entrada
        ctx.lineTo(150, 50 * (j + 1)); // Punto final en la esfera de salida
        ctx.stroke(); // Dibuja la línea
      }
    }
  }
}
