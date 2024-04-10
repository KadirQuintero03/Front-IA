import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/File.service';
import { entrenar } from '../utils/algoritmo01';
import { variables } from '../interface/variables';
import { graficaComponent } from './pages/grafica/grafica.component';
import { ConfigRNAComponent } from './pages/configRNA/configRNA.component';
import { ParametrosEntradaComponent } from './pages/parametrosEntrada/parametrosEntrada.component';
import { SimulacionComponent } from './pages/simulacion/simulacion.component';
import { HeaderComponent } from '../shared/header/header.component';

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
    SimulacionComponent,
    HeaderComponent,
  ],
  templateUrl: './Home.component.html',
})
export default class HomeComponent {
  variables: variables = new variables();
  valueRange: number = 0;

  constructor() {}

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
    console.log('rata: ', this.config.variables.rata_aprendizaje);
    console.log('error: ', this.config.variables.error_maximo);
    console.log('iteraciones: ', this.config.variables.num_iteraciones);
    console.log('METODO PROBAR');
    console.log('w: ', this.params.variables.w);
    console.log('u: ', this.params.variables.u);
    console.log("Data home", this.params.variables.data)

    let data = {
      entradas: this.params.variables.data.entradas,
      salidas: this.params.variables.data.salidas,
      numEntradas: this.params.variables.entradas,
      numSalidas: this.params.variables.salidas,
      numPatrones: this.params.variables.patrones,
      W: this.params.variables.w,
      U: this.params.variables.u,
    };



    entrenar(
      data,
      this.config.variables.rata_aprendizaje,
      this.config.variables.error_maximo,
      this.config.variables.num_iteraciones
    );

    // this.config.Entrenamiento()
    // console.log('variables', this.variables);
    console.log(this.config.variables.algoritmo_selec);
  }
}
