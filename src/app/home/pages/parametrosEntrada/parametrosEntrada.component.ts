import { CommonModule } from '@angular/common';
import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../../services/File.service';
import { variables } from '../../../interface/variables';
import HomeComponent from '../../Home.component';

@Component({
  selector: 'app-parametros-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parametrosEntrada.component.html',
  styleUrl: './parametrosEntrada.component.css',
})
@Injectable({
  providedIn: 'root', // Esto proporciona la instancia globalmente
})
export class ParametrosEntradaComponent {
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  mostrarsalida: boolean = false;
  mostrarsalidared: boolean = false;
  variables: variables = new variables();
  mostrarGrafica: boolean = false;
  valueRange: number = 0;

  constructor(private fileServices: FileService, public http: HttpClient, public home: HomeComponent) {}

  get(event: any) {
    //Almacenamos el archivo en una variable.
    this.variables.archivo = event.target.files[0];

    this.fileServices.mostrar(this.variables.archivo, this.http).subscribe(
      (response) => {
        this.variables.salidas = response[0].numSalidas;
        this.variables.entradas = response[0].numEntradas;
        this.variables.patrones = response[0].numPatrones;
        this.variables.w = response[0].W;
        this.variables.u = response[0].U;
        this.variables.data = {
          salidas: response[0].salidas,
          entradas: response[0].entradas,
        };
        this.home.Draw(this.variables.entradas, this.variables.salidas);
        this.variables.ver_neurona = true;
        console.log('w: ', this.variables.w);
        console.log('u: ', this.variables.u);
        console.log('data: ', this.variables.data);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }
}
