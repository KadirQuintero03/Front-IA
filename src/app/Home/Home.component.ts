import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileService } from '../services/File.service';
import { variables } from '../interface/variables';
import { entrenar } from '../share/training';
import { GraphicComponent } from '../graphic/graphic.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    GraphicComponent,
  ],
  templateUrl: './Home.component.html',
})
export default class HomeComponent {
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo que se selecciono
  patrones: number = 0; //Numero de patrones
  entradas: number = 0; //Numero de entradas
  salidas: number = 0; //Numero de salidas

  data: any; //La Data que se recibe del servidor
  w: [] = []; //Pesos
  u: [] = []; //Umbrales
  mostrarsalida: boolean = false;
  mostrarsalidared: boolean = false;
  archivo: File | null = null;
  parameters: variables = new variables();
  mostrarGrafica: boolean = false;
  @ViewChild('Neurona', { static: false }) canvasRef!: ElementRef;
  @ViewChild('file_input', { static: false }) fileInputRef!: ElementRef;

  Draw(): void {
    // Aquí puedes acceder al elemento Canvas usando this.canvasRef.nativeElement
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'white'; // Establece el color de trazo
    ctx.fillStyle = 'white'; //Establece el color de relleno

    for (let i = 0; i < this.entradas; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }
    console.log('data', this.data);

    for (let i = 0; i < this.salidas; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja un círculo
      ctx.fill(); // Rellena el círculo
    }

    // Conecta cada esfera de entrada con cada esfera de salida
    for (let i = 0; i < this.entradas; i++) {
      for (let j = 0; j < this.salidas; j++) {
        ctx.beginPath();
        ctx.moveTo(50, 50 * (i + 1)); // Punto de inicio en la esfera de entrada
        ctx.lineTo(150, 50 * (j + 1)); // Punto final en la esfera de salida
        ctx.stroke(); // Dibuja la línea
      }
    }
  }

  constructor(private fileServices: FileService, private http: HttpClient) {}
  get(event: any) {
    //Almacenamos el archivo en una variable.
    this.archivo = event.target.files[0];

    this.fileServices.mostrar(this.archivo, this.http).subscribe(
      (response) => {
        this.salidas = response[0].salidas;
        this.entradas = response[0].entradas;
        this.patrones = response[0].patrones;
        this.w = response[0].W;
        this.u = response[0].U;
        this.data = [
          { entradasValue: response[0].valoresEntradas },
          { salidasValue: response[0].valoresSalidas },
          this.Draw(),
        ];
        console.log('Response: ', response);
        console.log(this.data[1].salidasValue[0][0]);
      },
      (error) => {
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  mostrarSalida() {
    setTimeout(() => {
      this.mostrarsalida = true;
    }, 2000);
  }
  mostrarGraficai() {
    setTimeout(() => {
      this.mostrarGrafica = true;
    }, 2000);
  }
  mostrarSalidaRed() {
    setTimeout(() => {
      this.mostrarsalidared = true;
    }, 8000);
  }

  //Almacenamos el nombre del algoritmo ingresado
  algoritmo_select(nom_algoritmo: String) {
    this.algoritmo_selec = nom_algoritmo;
  }

  //Metodo que llamara a la funcion que ejecutara el algoritmo
  Entrenamiento() {
    this.mostrarGraficai()
    const { num_iteraciones, rata_aprendizaje, error_maximo } = this.parameters;

    // //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    // if (num_iteraciones <= 0) {
    //   return alert('Ingrese un numere de interaciones mayor a 0');
    // }

    // //Validamos que la rata de aprendizaje no sea menor a 0 ni mayor a 1.
    // if (rata_aprendizaje <= 0 || rata_aprendizaje > 1) {
    //   return alert(
    //     'La rata de aprendizaje no puede ser menor a 0 ni mayor a 1'
    //   );
    // }

    // //Validamos que el error maximo permitido no sea menor a 0 ni mayor a 0.1.
    // if (error_maximo < 0 || error_maximo > 0.1) {
    //   return alert('El error maximo debe ser entre un rango de 0 hasta 0.1');
    // }

    // console.log('Algoritmo selec: ', this.algoritmo_selec);
    // if (this.algoritmo_selec != 'algoritmo1') {
    //   return alert('Seleccione un algoritmo de entrenamiento valido');
    // }
    entrenar(
      this.data,
      this.parameters,
      { w: this.w, u: this.u },
      this.entradas,
      this.salidas,
      this.patrones
    );
  }
}
