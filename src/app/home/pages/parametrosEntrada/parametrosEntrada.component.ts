import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  Inject,
  output,
  Injectable,
} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FileService } from '../../../services/File.service';
import { variables } from '../../../interface/variables';
import { entrenar } from '../../../utils/algoritmo01';

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

  constructor(private fileServices: FileService, private http: HttpClient) {}

  @ViewChild('Neurona', { static: false }) canvasRef!: ElementRef;

  Draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white'; // Establece el color de trazo
    ctx.fillStyle = 'white'; //Establece el color de relleno

    for (let i = 0; i < this.variables.entradas; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    console.log('data', this.variables.data);

    for (let i = 0; i < this.variables.salidas; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    // Conecta cada esfera de entrada con cada esfera de salida
    for (let i = 0; i < this.variables.entradas; i++) {
      for (let j = 0; j < this.variables.salidas; j++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 * (i + 1)); // Punto de inicio en la esfera de entrada
        ctx.lineTo(150, 50 * (j + 1)); // Punto final en la esfera de salida
        ctx.stroke(); // Dibuja la línea
      }
    }
  }

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
        //{ entradas: response[0].entradas },
        this.Draw();
        console.log('w: ', this.variables.w);
        console.log('u: ', this.variables.u);
        console.log('data: ', this.variables.data);
        // console.log('Response: ', response);
        // console.log('EntradasValue:', this.data[1].entradas);
        // console.log('SalidasValue: ', this.data[0].salidas);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }
}
