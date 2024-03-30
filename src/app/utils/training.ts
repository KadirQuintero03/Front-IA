import { variables } from '../interface/variables';

export function entrenar(
  data: any,
  Parameters: variables,
  WyU: any,
  m: number, //Entradas
  n: number, //Salidas
  numPatrones: number
) {
  WyU.w = [
    [1, 1],
    [0.5, 0.5],
    [0.2, 0.3],
  ]; //Patrones
  WyU.u = [0, -1]; //Umbrales
  let funcion_soma = 0; //Salida de la funcion soma
  let vectorAux: number[] = [];
  let lista_fs: number[] = [];
  let funcion_activacion = 0;

  console.log('entradas', data[0].entradasValue[1]);
  console.log('salidas', data[1].salidasValue[1]);

  let i = 0;

  for (let f = 0; f < numPatrones; f++) {
    for (let c = 0; c < m; c++) {
      vectorAux[i] = data[0].entradasValue[f][c];
      i++;
      //console.log(data[0].entradasValue[f][c])
    }
    for (let k = 0; k < n; k++) {
      for (let j = 0; j < m; j++) {
        funcion_soma += vectorAux[j] * WyU.w[j][k];
        console.log('Funcion soma: ', funcion_soma);
        console.log('Vector Auxiliar: ', vectorAux);
        console.log("Pesos: ",WyU.w[j][k])
      }
      lista_fs[k] = funcion_soma
      console.log("Lista fs: ", lista_fs[k])
    }

    //YA VENGO VOY A BUSCAR ALGO VAMOS POR BUEN CAMINO dejo el any abierto

    vectorAux = [];
    i = 0;
    funcion_soma = 0;
  }
//KASDKAJSDJASJD VOY A METERLE VIRU JIJIJI
// me sali de la llamada ya tu sabes el pq

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
}
const Ss = (data: any, m: number, n: number, patrones: number, pesos: any) => {
  let suma;
  for (let k = 0; k < patrones; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        suma = data[0].entradasValue[k][j] * pesos.w[j][i];
        console.log('suma', suma);
      }
      console.log('pase de columna en pesos');
    }
    console.log('pase de patron');
  }
};
