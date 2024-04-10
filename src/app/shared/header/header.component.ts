import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

@Injectable({
  providedIn: 'root', // Esto proporciona la instancia globalmente
})

export class HeaderComponent { }
