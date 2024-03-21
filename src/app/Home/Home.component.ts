import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/File.service';
import { variables } from '../interface/variables';
import { entrenar } from '../share/training';
import { GraphicComponent } from '../graphic/graphic.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    GraphicComponent,
  ],
  templateUrl: './Home.component.html',
})
export default class HomeComponent {
  parameters: variables = new variables();
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  //archivo: File | null = null;
  patrones: number = 0; //Numero de patrones
  entradas: number = 0; //Numero de entradas
  salidas: number = 0; //Numero de salidas
  data: [] = []; //La Data que se recibe del servidor
  w: [] = []; //Pesos
  u: [] = []; //Umbrales

  constructor(private fileServices: FileService, private http: HttpClient) {}
  get(event: any) {
    //Validamos que se haya seleccionado un archivo.
    if (!event.target.files || event.target.files.length === 0) {
      alert('No se ha seleccionado ningún archivo');
      return;
    }

    //Almacenamos el archivo en una variable.
    const archivo = event.target.files[0];

    this.fileServices.mostrar(archivo, this.http).subscribe(
      (response) => {
        this.salidas = response[0].salidas;
        this.entradas = response[0].entradas;
        this.patrones = response[0].patrones;
        this.data = response[0].valores;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  //Almacenamos el nombre del algoritmo ingresado
  algoritmo_select(nom_algoritmo: String) {
    this.algoritmo_selec = nom_algoritmo;
  }

  //Metodo que llamara a la funcion que ejecutara el algoritmo
  Entrenamiento() {
    const { num_iteraciones, rata_aprendizaje, error_maximo } = this.parameters;

    //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    if (num_iteraciones <= 0) {
      return alert('Ingrese un numere de interaciones mayor a 0');
    }

    //Validamos que la rata de aprendizaje no sea menor a 0 ni mayor a 1.
    if (rata_aprendizaje <= 0 || rata_aprendizaje > 1) {
      return alert(
        'La rata de aprendizaje no puede ser menor a 0 ni mayor a 1'
      );
    }

    //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    if (error_maximo < 0 || error_maximo > 0.1) {
      return alert('El error maximo debe ser entre un rango de 0 hasta 0.1');
    }

    //Validamos que el algoritmo que se seleccione no sea diferente de 1.
    if (this.algoritmo_selec != 'algoritmo1') {
      return alert('Seleccione un algoritmo de entrenamiento valido');
    }

    //Funcion entrenar de entrenamiento.ts
    entrenar(this.data, this.parameters);
  }
}
