import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions, yaxis } from '../../../utils/type_Charts';
import { north, arrayObjetos } from '../../../utils/data_Charts';
import { TrainingService } from '../../../services/socket.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './grafica.component.html',
})

export class graficaComponent implements OnInit {
  datosGrafica: any[] = [];

  ngOnInit(): void {
    this.training.entrenamiento().subscribe((response) => {
      // Actualiza los datos de la serie de la gráfica
      this.iteraciones = response;
      this.datosGrafica.push(response.error);
      this.datosGrafica.push(response.error);
      console.log('datos grafica', this.datosGrafica);

      // this.chartOptions.series = [{ name: 'Error', data: this.iteraciones }];
      return response.error;
      // Verifica si la gráfica está inicializada antes de actualizar
    });
  }

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  iteraciones: any[] = []; // Inicializa iteraciones como un array vacío
  chartInitialized: boolean = false;

  constructor(private training: TrainingService) {
    this.chartOptions = {
      series: [{ name: 'Error', data: [] }],
      chart: {
        type: 'area',
        height: 270,
        width: 800,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      title: {
        align: 'left',
        style: {
          color: 'white',
          fontSize: '14px',
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      // Aquí defines yaxis según tus necesidades, asumo que ya está definido en tu código
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
}
