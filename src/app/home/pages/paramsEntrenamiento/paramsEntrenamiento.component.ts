import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { variables } from '../../../interface/variables';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-params-entrenamiento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './paramsEntrenamiento.component.html',
  styles: ``,
})
export class ParamsEntrenamientoComponent {
  variables: variables = new variables();
}
