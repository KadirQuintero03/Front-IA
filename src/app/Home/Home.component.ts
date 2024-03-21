import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FileService } from '../services/File.service';
import { ChartOptions, yaxis } from '../share/TypeCharts';
import { north, south } from '../share/data';
import { ChartComponent } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { variables } from '../interface/variables';
import { entrenar } from '../share/Entrenamiento';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './Home.component.html',
})
export default class HomeComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  variables: variables = new variables();
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  archivo: File | null = null;
  patrones: number = 0; //Numero de patrones
  entradas: number = 0; //Numero de entradas
  salidas: number = 0; //Numero de salidas
  data: any; //La Data que se recibe del servidor
  w: [] = []; //Pesos
  u: [] = []; //Umbrales

  constructor(private fileServices: FileService, private http: HttpClient) {
    this.chartOptions = {
      series: [
        {
          name: 'north',
          data: north,
        },
        {
          name: 'south',
          data: south,
        },
      ],
      chart: {
        type: 'area',
        height: 270,
        width: 550,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      title: {
        text: 'Area with Negative Values',
        align: 'left',
        style: {
          color: 'white',
          fontSize: '14px',
        },
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: yaxis,
      fill: {
        opacity: 0.5,
      },
      tooltip: {
        x: {
          format: 'yyyy',
        },
        fixed: {
          enabled: false,
          position: 'topRight',
        },
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30,
          },
        },
        padding: {
          left: 20,
        },
      },
    };
  }
  get(event: any) {
    this.archivo = event.target.files[0];
    this.fileServices.mostrar(this.archivo, this.http).subscribe(
      (response) => {
        this.salidas = response[0].salidas;
        this.entradas = response[0].entradas;
        this.patrones = response[0].patrones;
        this.w=response[0].W
        this.u=response[0].U
        this.data = [
          { entradasValue: response[0].valoresEntradas },
          { salidasValue: response[0].valoresSalidas },
        ];
        console.log('Response: ', response);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  algoritmo_select(nom_algoritmo: String) {
    this.algoritmo_selec = nom_algoritmo;
    console.log(this.algoritmo_selec);
  }

  Entrenar() {
    let { num_iteraciones, rata_aprendizaje, error_maximo } = this.variables;

    if (num_iteraciones <= 0) {
      return alert('Ingrese un numere de interaciones mayor a 0');
    }

    if (rata_aprendizaje <= 0 || rata_aprendizaje > 1) {
      return alert(
        'La rata de aprendizaje no puede ser menor a 0 ni mayor a 1'
      );
    }

    if (error_maximo < 0 || error_maximo > 0.1) {
      return alert('El error maximo debe ser entre un rango de 0 hasta 0.1');
    }

    console.log('Algoritmo selec: ', this.algoritmo_selec);
    if (this.algoritmo_selec === 'algoritmo1') {
      entrenar(this.data, this.variables,{w:this.w,u:this.u});
    }
  }
}
