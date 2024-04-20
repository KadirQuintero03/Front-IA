//variables globales
export class variables {
  num_iteraciones: number = 0; //Numero de iteraciones -> Ingresa el usuario -> Condicion de parada secundaria
  rata_aprendizaje: number = 0; //Rata de aprendizaje -> Ingresa el usuario
  error_maximo: number = 0; //Error maximo permitido -> Ingresa el usuario -> Condicion de parada principal

  patrones: number = 0; //Numero de patrones -> Banco de datos
  entradas: number = 0; //Numero de entradas -> Banco de datos
  salidas: number = 0; //Numero de salidas -> Banco de datos

  w: [] = []; //Pesos -> Backend
  u: [] = []; //Umbrales -> Backend
  data: any; //La Data que se recibe del servidor

  algoritmos: String[] = [
    'Correccion de errores',
    'Backpropagation',
  ]; //Algoritmos disponibles
  algoritmo_selec: String = ''; //Almacena el valor del algoritmo seleccionado
  archivo: File | null = null; //Almacena el archivo que se carga

  //variables del algoritmo02
  func_Activacion: String[] = ['Tangente', 'Sigmoide', 'Seno', 'Lineal'];
  capa: Number[] = [1, 2, 3];
  ver_neurona: boolean = false;
}

//variables del algoritmo01
export interface Data {
  numEntradas: number;
  numSalidas: number;
  numPatrones: number;
  W: number[][];
  U: number[];
  salidas: number[][];
  entradas: number[][];
}
export interface pesosType {
  valueW: number[][];
  valueU: number[];
}
