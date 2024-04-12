import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  ver_neurona: boolean = false;

  @ViewChild(ParametrosEntradaComponent)
  parametrosEntrada!: ParametrosEntradaComponent;

  @ViewChild(ConfigRNAComponent)
  config!: ConfigRNAComponent;

  @ViewChild(ParametrosEntradaComponent)
  params!: ParametrosEntradaComponent;

  @ViewChild('Neurona', { static: false }) canvasRef!: ElementRef;

  Draw(en: number, sa: number): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white'; // Establece el color de trazo
    ctx.fillStyle = 'white'; //Establece el color de relleno

    for (let i = 0; i < en; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    for (let i = 0; i < sa; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    // Conecta cada esfera de entrada con cada esfera de salida
    for (let i = 0; i < en; i++) {
      for (let j = 0; j < sa; j++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 * (i + 1)); // Punto de inicio en la esfera de entrada
        ctx.lineTo(150, 50 * (j + 1)); // Punto final en la esfera de salida
        ctx.stroke(); // Dibuja la línea
      }
    }
  }

  get(event: any) {
    this.parametrosEntrada.get(event);
    this.ver_neurona = true;
  }
  verGrafica: boolean = false;

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
    console.log('Data home', this.params.variables.data);

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
    this.verGrafica = true;

    // this.config.Entrenamiento()
    // console.log('variables', this.variables);
    console.log(this.config.variables.algoritmo_selec);
  }
}
