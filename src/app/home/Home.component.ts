import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/File.service';
import { variables } from '../interface/variables';
import { graficaComponent } from './pages/grafica/grafica.component';
import { ConfigRNAComponent } from './pages/configRNA/configRNA.component';
import { ParametrosEntradaComponent } from './pages/parametrosEntrada/parametrosEntrada.component';
import { SimulacionComponent } from './pages/simulacion/simulacion.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    graficaComponent,
    ConfigRNAComponent,
    ParametrosEntradaComponent,
    SimulacionComponent
  ],
  templateUrl: './Home.component.html',
})
export default class HomeComponent {
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  data: any; //La Data que se recibe del servidor
  w: [] = []; //Pesos
  u: [] = []; //Umbrales
  mostrarsalida: boolean = false;
  mostrarsalidared: boolean = false;
  archivo: File | null = null;
  variables: variables = new variables();
  mostrarGrafica: boolean = false;
  valueRange: number = 0;

  constructor(private fileServices: FileService, private http: HttpClient) {}

  @ViewChild(ParametrosEntradaComponent)
  parametrosEntrada!: ParametrosEntradaComponent;

  @ViewChild(ConfigRNAComponent)
  config!: ConfigRNAComponent;

  @ViewChild(ParametrosEntradaComponent)
  params!: ParametrosEntradaComponent;

  get(event: any) {
    this.parametrosEntrada.get(event);
  }

  probar() {
    console.log('numEntradas: ', this.params.variables.entradas);
    console.log('numSalidas: ', this.params.variables.salidas);
    console.log('numPatrones: ', this.params.variables.patrones);
    console.log("rata: ",this.config.variables.rata_aprendizaje);
    console.log("error: ",this.config.variables.error_maximo);
    console.log("iteraciones: ",this.config.variables.num_iteraciones);
    console.log("METODO PROBAR")
    console.log("w: ",this.params.variables.w);
    console.log("u: ",this.params.variables.u);
    console.log("data: ",this.params.variables.data);

    // this.config.Entrenamiento()
    // console.log('variables', this.variables);
    console.log(this.config.algoritmo_selec);
  }

}
