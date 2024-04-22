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
  //styleUrl: './configRNA.component.css',
})
export class ConfigRNAComponent {
  variables: variables = new variables();
  neu_cap1: string = '';
  capa_selec: number = 0; // Almacenara el valor del select
  num_capa: any[] = []; // Contendra un N°Elemento según el valor que se seleccione en el select
  capasNeu: any[] = [];
  fActivation: any[] = [];

  algoritmo_select(valor: String) {
    this.variables.algoritmo_selec = valor;
    for (let i = 0; i < this.num_capa.length; i++) {
      let name = `numNeuronasCapa${i + 1}`;

      this.capasNeu.push({ [name]: this.num_capa[i],fa:this.fActivation[i] });
    }
    console.log('capas', this.capasNeu);
  }

  //Declaramos el metodo que actualizara el N°Elemento de mum_capa
  //Lo llamamos en el select del HTML
  actualizarLista(): void {
    this.num_capa =
      //Crea un nuevo arreglo basado en el objeto iterable que se proporcione.
      Array.from(
        {
          //Proporciona la longitud que tendra el nuevo arreglo
          length: this.capa_selec,
        },
        //Funcion de mappeo
        (index_value) => index_value
      );
      this.fActivation =
      //Crea un nuevo arreglo basado en el objeto iterable que se proporcione.
      Array.from(
        {
          //Proporciona la longitud que tendra el nuevo arreglo
          length: this.capa_selec,
        },
        //Funcion de mappeo
        (index_value) => index_value
      );
  }
}
