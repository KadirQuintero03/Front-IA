import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from '../../../utils/type_Charts';
import { TrainingService } from '../../../services/socket.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './grafica.component.html',
})
export class graficaComponent implements OnInit {
  datosGrafica: any[] = [];
  datosIt:any[]=[]

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor(private training: TrainingService) {}

  ngOnInit(): void {
    this.training.entrenamiento().subscribe((response) => {
      // Agrega los datos recibidos a la serie de la gráfica
      this.datosGrafica.push(response.error);
      this.datosIt.push(response.iteraciones)
      console.log("iteraciones",this.datosIt);


      // Actualiza la gráfica con los nuevos datos
      this.updateChart();

      // Verifica si superamos el número máximo de iteraciones permitidas
      if (this.datosGrafica.length > 20) {
        // Calcula la cantidad de elementos a eliminar
        const elementosEliminar = this.datosGrafica.length - 20;
        // Elimina los datos más antiguos de la gráfica
        this.datosGrafica.splice(0, elementosEliminar);
        this.datosIt.shift()
      }
    });

    // Configura las opciones de la gráfica
    this.chartOptions = {
      series: [{ name: 'Error', data: this.datosGrafica }],
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
        categories: this.datosIt,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
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

  // Función para actualizar la gráfica con los datos actualizados
  updateChart(): void {
    // Actualiza las opciones de la gráfica con los nuevos datos
    this.chart.updateOptions(
      {
        series: [{ name: 'Error', data: this.datosGrafica }],
        xaxis: { categories: this.datosIt },
      },
      true
    );
  }
}
