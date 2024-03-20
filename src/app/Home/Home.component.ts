import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './Home.component.html',
  //styleUrl: './Home.component.css',
})
export default class HomeComponent { }
