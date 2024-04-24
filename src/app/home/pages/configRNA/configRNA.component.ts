import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { variables } from '../../../interface/variables';
import { FormsModule } from '@angular/forms';

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


  algoritmo_select(valor: String) {
    this.variables.algoritmo_selec = valor;
    for (let i = 0; i < this.variables.num_capa.length; i++) {
      let name = `numNeuronasCapa${i + 1}`;

      this.variables.capasNeu.push({ [name]: this.variables.num_capa[i],fa:this.variables.fActivation[i] });
    }
    console.log('capas', this.variables.capasNeu);
  }

  //Declaramos el metodo que actualizara el N°Elemento de mum_capa
  //Lo llamamos en el select del HTML
  actualizarLista(): void {
    this.variables.num_capa =
      //Crea un nuevo arreglo basado en el objeto iterable que se proporcione.
      Array.from(
        {
          //Proporciona la longitud que tendra el nuevo arreglo
          length: this.variables.capa_selec,
        },
        //Funcion de mappeo
        (index_value) => index_value
      );
      this.variables.fActivation =
      //Crea un nuevo arreglo basado en el objeto iterable que se proporcione.
      Array.from(
        {
          //Proporciona la longitud que tendra el nuevo arreglo
          length: this.variables.capa_selec,
        },
        //Funcion de mappeo
        (index_value) => index_value
      );
  }
}
