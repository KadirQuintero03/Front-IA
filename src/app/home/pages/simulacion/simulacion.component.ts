import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-simulacion',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './simulacion.component.html',
  //styleUrl: './simulacion.component.css',
})

@Injectable({
  providedIn: 'root', // Esto proporciona la instancia globalmente
})

export class SimulacionComponent { }
