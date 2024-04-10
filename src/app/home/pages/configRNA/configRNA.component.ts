import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { variables } from '../../../interface/variables';
import { FormsModule } from '@angular/forms';
import { entrenar } from '../../../utils/algoritmo01';

@Component({
  selector: 'app-config-rna',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configRNA.component.html',
  styleUrl: './configRNA.component.css',
})
export class ConfigRNAComponent {
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  algortimos: string[] = [
    'Algortimo 1',
    'Algoritmo 2',
    'Algoritmo 3',
    'algoritmo 4',
  ];
  algoritmo_select(nom_algoritmo: String) {
    this.algoritmo_selec = nom_algoritmo;
  }
  valueRange: number = 0;
  rangoError: number = 0;
  rangoRata:number=0;
  variables: variables = new variables();

  Entrenamiento() {
    console.log(this.variables);
    console.log('entrenar aqui', this.algoritmo_selec);




    const { num_iteraciones, rata_aprendizaje, error_maximo } = this.variables;

    // //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    // if (num_iteraciones <= 0) {
    //   return alert('Ingrese un numere de interaciones mayor a 0');
    // }

    // //Validamos que la rata de aprendizaje no sea menor a 0 ni mayor a 1.
    // if (rata_aprendizaje <= 0 || rata_aprendizaje > 1) {
    //   return alert(
    //     'La rata de aprendizaje no puede ser menor a 0 ni mayor a 1'
    //   );
    // }

    // //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    // if (error_maximo < 0 || error_maximo > 0.1) {
    //   return alert('El error maximo debe ser entre un rango de 0 hasta 0.1');
    // }

    // console.log('Algoritmo selec: ', this.algoritmo_selec);
    // if (this.algoritmo_selec != 'Algoritmo1') {
    //   return alert('Seleccione un algoritmo de entrenamiento valido');
    // }

    entrenar(
      this.variables.data,
      this.variables,
      { w: this.variables.w, u: this.variables.u },
      this.variables.entradas,
      this.variables.salidas,
      this.variables.patrones
    );
  }
}
