import { variables } from '../interface/variables';

export function entrenar(
  data: any,
  Parameters: variables,
  WyU: any,
  m: number,
  n: number,
  numPatrones: number
) {
  let eit = 1; //Error total de los patrones
  let cont = 1;
  let suma = 0; //Salida de la funcion soma
  let sumaEpatron = 0;
  var SI = []; //Salidas y1 y2
  var si: any; //Se aplica la funcion de activacion 0 o 1
  var error_lineal: any; //Error lineal
  let error_linealV = []; //Guardamos los errores lineales en un vector
  let suma_error_lineal = 0; //Suma error lineal
  let error_patron = []; //Error patron
  WyU.u = [0.5, 0.3]; //Umbral
  WyU.w = [
    [0.5, 0.8],
    [0.3, -1],
    [0.4, 0],
  ]; //Pesos

// 1 > 0.05
  while (eit > Parameters.error_maximo) {

    console.log('Cont: ', cont, 'Eit: ', eit); // Imprime Cont: 1 Eit: 1

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        console.log('Data: ', data[0]); //Imprime todos los patrones de entrada
        for (let j = 0; j < m; j++) {
          suma = data[0].entradasValue[k][j] * WyU.w[j][i]; //Salida de la funcion soma
          console.log(`Entradas ${[j]}: `, data[0].entradasValue[k][j])
          console.log(`Patron ${[j]}: `, WyU.w[j][i])
          console.log('Posicion K: ',[k], 'Posicion J: ',[j],'Suma: ', suma);
        }
        // Funcion de activacion y salida atenuada
        if (suma - WyU.u[k] >= 0) {
          si = 1;
        } else {
          si = 0;
        }
        // el = data[1].salidasValue[k] - si;//error lineal
      }
      SI.push(si);
      error_lineal = data[1].salidasValue[k];
    }
    console.log('SI:', SI);
    // UMBRALES
    console.log('U1', WyU.u[0]);
    console.log('U2', WyU.u[1]);

    for (let i = 0; i < 1; i++) {
      for (let k = 0; k < n; k++) {
        error_lineal = data[1].salidasValue[i][k] - SI[k]; //error lineal en el patron
        error_linealV.push(error_lineal);
      }
    }
    cont++;
    console.log('Errores lineales: ', error_linealV);

    for (let i = 0; i < error_linealV.length; i++) {
      suma_error_lineal += Math.abs(error_linealV[i]);
    }
    console.log('Suma error Lineal: ', suma_error_lineal);
    error_patron.push(suma_error_lineal / n); //error producido patron 1
    console.log('Error Patron 1', error_patron);
    console.log(SI[0]);
    console.log(data[1].salidasValue[1][0]);
    // aplicando algoritmo de training
    // Wji=Wji +rata*Eli*Xj

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let pesoN =
          WyU.w[j][i] +
          Parameters.rata_aprendizaje *
            error_linealV[i] *
            data[1].salidasValue[j][i]; //CALCULANDO PESOS
        // WyU.w = [
        //   [0.5, 0.8],
        //   [0.3, -1],
        //   [0.4, 0],
        // ];

        WyU.w[j][i] = pesoN; //Modificando pesos
      }
    }
    for (let i = 0; i < n; i++) {
      let Unew = WyU.u[i] + Parameters.rata_aprendizaje * error_linealV[i] * 1;
      WyU.u[i] = Unew;
    }
    console.log('PESO NEW', WyU.w);
    console.log('UMBRAL NEW', WyU.u);

    for (let i = 0; i < error_patron.length; i++) {
      sumaEpatron += error_patron[i];
    }

    eit = sumaEpatron / numPatrones;
    console.log('ETI', eit);
  }
}
