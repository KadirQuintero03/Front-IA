import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { ChartOptions, yaxis } from '../share/type_Charts';
import { north, mostrar, arrayObjetos } from '../share/data_Charts';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './graphic.component.html',
})
export class GraphicComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  iteraciones: any;

  constructor() {
    mostrar();
    this.iteraciones = arrayObjetos;
    this.chartOptions = {
      series: [
        {
          name: 'Eli',
          data: arrayObjetos,
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
        type: 'numeric',
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
}
