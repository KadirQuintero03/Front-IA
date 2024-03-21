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
import { prmts_entrenamiento } from '../interface/prmtsEntrenamiento';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule],
  templateUrl: './Home.component.html',
  // styleUrl: './Home.component.css',
})
export default class HomeComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  archivo: File | null = null;
  entradas = 0;
  salidas = 0;
  patrones = 0;
  data = [];
  newParameters: prmts_entrenamiento = new prmts_entrenamiento();

  addParameters(){
    const {num_iteraciones, rata_aprendizaje, error_maximo} = this.newParameters

    if(num_iteraciones <= 0){
      return alert("Ingrese un numere de interaciones mayor a 0")
    }

    if(rata_aprendizaje <= 0 || rata_aprendizaje > 1){
      return alert("La rata de aprendizaje no puede ser menor a 0 ni mayor a 1")
    }

    console.log("Num:", num_iteraciones, "Rata: ",rata_aprendizaje)
  }

  constructor(private prueba: FileService, private http: HttpClient) {
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
    this.prueba.mostrar(this.archivo, this.http).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response[0].salidas);
        this.salidas = response[0].salidas;
        this.entradas = response[0].entradas;
        this.patrones = response[0].patrones;
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }
}
