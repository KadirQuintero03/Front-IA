import { variables } from '../interface/variables';

export function entrenar(
  data: any,
  Parameters: variables,
  WyU: any,
  m: number,
  n: number,
  numPatrones: number
) {
  //Salida de la funcion soma
  let sumaEpatron = 0;
  var SI = []; //Salidas y1 y2
  var si: any; //Se aplica la funcion de activacion 0 o 1
  var error_lineal: any; //Error lineal
  let error_linealV = []; //Guardamos los errores lineales en un vector
  let suma_error_lineal = 0; //Suma error lineal
  let error_patron = []; //Error patron
  WyU.u = [0.5, 0.3]; //Umbral
  WyU.w = [
    [1, 1],
    [0.5, 0.5],
    [0.2, 0.3],
  ];

  let eit = 1;
  let epatron = [];
  WyU.u = [0, -1];
  let cont = 1;
  console.log('entradas', data[0].entradasValue[1]);
  console.log('salidas', data[1].salidasValue[1]);

  let suma = 0;
  var SI = []; //salidas y1 y2
  var si: any;
  var el: any;
  let vectorAux: number[] = [];
  console.log('error maximo: ', Parameters.error_maximo);
  let i = 0;
  for (let f = 0; f < numPatrones; f++) {
    for (let c = 0; c < m; c++) {
      vectorAux[i] = data[0].entradasValue[f][c];
      i++;
    }
    for (let k = 0; k < m; k++) {
      for (let j = 0; j < n; j++) {
        suma += vectorAux[k] * WyU.w[k][j];
      }
    }

    console.log(vectorAux);
    console.log(suma);
    vectorAux = [];
    i = 0;
    suma = 0;
  }
}
/*const Ss = (data: any, m: number, n: number, patrones: number, pesos: any) => {
  let suma;
  for (let k = 0; k < patrones; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let pesoN =
          WyU.w[j][i] +
          Parameters.rata_aprendizaje * eli[i] * data[1].salidasValue[j][i]; //CALCULANDO PESOS
        // WyU.w = [
        //   [0.5, 0.8],
        //   [0.3, -1],
        //   [0.4, 0],
        // ];

        WyU.w[j][i] = pesoN; //MODIFICANDO PESOS
      }
    }
    for (let i = 0; i < n; i++) {
      let Unew = WyU.u[i] + Parameters.rata_aprendizaje * eli[i] * 1;

      WyU.u[i] = Unew;
    }
    console.log('PESO NEW', WyU.w);
    console.log('UMBRAL NEW', WyU.u);
    let sumaEpatron = 0;
    for (let i = 0; i < epatron.length; i++) {
      sumaEpatron += epatron[i];
    }
    eit = sumaEpatron / numPatrones;
    console.log('ETI', eit);
  }

  // 0.5 > 0.05
  // while (eit > Parameters.error_maximo) {
  //   console.log('eit', cont, eit);
  //   console.log(n)
  //   Ss(data,m,n,numPatrones,WyU)
  //   for (let k = 0; k < numPatrones; k++) {
  //     let vectorAux: number[] = data[0].entradasValue
  //     for (let i = 0; i < n; i++) {
  //       for (let j = 0; j < m; j++) {
  //         suma = data[0].entradasValue[k][j] * WyU.w[j][i];
  //         let pesos:number[][] = WyU.w[j][i]
  //         if (suma - WyU.u[i] >= 0) {
  //           si = 1;
  //         } else {
  //           si = 0;
  //         }
  //         el = data[1].salidasValue[j];
  //       }
  //       // funcion de activacion

  //       // el = data[1].salidasValue[k] - si;//error lineal
  //     }

  //     SI.push(si);

  //     console.log('SI:', SI);
  //     // UMBRALES
  //     console.log('U1', WyU.u[0]);
  //     console.log('U2', WyU.u[1]);
  //     let eli = [];
  //     for (let i = 0; i < 1; i++) {
  //       for (let k = 0; k < n; k++) {
  //         el = data[1].salidasValue[i][k] - SI[k]; //error lineal en el patron
  //         eli.push(el);
  //       }
  //     }
  //     cont++;
  //     console.log('errores lineales', eli);
  //     let sumaeli = 0;
  //     for (let i = 0; i < eli.length; i++) {
  //       sumaeli += Math.abs(eli[i]); //suma error lineal
  //     }
  //     console.log('suma errorl', sumaeli);
  //     epatron.push(sumaeli / n); //error producido patron 1
  //     console.log('ep1', epatron);
  //     console.log(SI[0]);
  //     console.log(data[1].salidasValue[1][0]);
  //     // aplicando algoritmo de training
  //     // Wji=Wji +rata*Eli*Xj
  //     console.log(WyU.w);
  //     console.log('params', Parameters);

  //     for (let i = 0; i < n; i++) {
  //       for (let j = 0; j < m; j++) {
  //         let pesoN =
  //           WyU.w[j][i] +
  //           Parameters.rata_aprendizaje * eli[i] * data[1].salidasValue[j][i]; //CALCULANDO PESOS
  //         // WyU.w = [
  //         //   [0.5, 0.8],
  //         //   [0.3, -1],
  //         //   [0.4, 0],
  //         // ];

  //         WyU.w[j][i] = pesoN; //MODIFICANDO PESOS
  //       }
  //     }
  //     for (let i = 0; i < n; i++) {
  //       let Unew = WyU.u[i] + Parameters.rata_aprendizaje * eli[i] * 1;

  //       WyU.u[i] = Unew;
  //     }
  //     console.log('PESO NEW', WyU.w);
  //     console.log('UMBRAL NEW', WyU.u);
  //     let sumaEpatron = 0;
  //     for (let i = 0; i < epatron.length; i++) {
  //       sumaEpatron += epatron[i];
  //     }
  //     eit = sumaEpatron / numPatrones;
  //     console.log('ETI', eit);
  //   }

  // }
}*/
