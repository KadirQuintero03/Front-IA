import { variables } from '../interface/variables';

export function entrenar(
  data: any,
  Parameters: variables,
  WyU: any,
  m: number,
  n: number,
  numPatrones: number
) {
  WyU.w = [
    [0.5, 0.8],
    [0.3, -1],
    [0.4, 0],
  ];
  let eit = 1;
  let epatron = [];
  WyU.u = [0.5, 0.3];
  let cont = 1;
  console.log('entradas', data[0].entradasValue[1]);
  console.log('salidas', data[1].salidasValue[1]);
  // salida de la red en el primer patron S1=(s1*w11+s2*w21+s3*w31)
  // salida de la red en el primer patron S2=(s1*w12+s2*w22+s3*w32)
  let suma = 0;
  var SI = []; //salidas y1 y2
  var si: any;
  var el: any;
  console.log('error maximo: ', Parameters.error_maximo);
  // 1            0.05

  // 0.5 > 0.05
  while (eit > Parameters.error_maximo) {
    console.log('eit', cont, eit);

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        console.log('r', data[0]);
        for (let j = 0; j < m; j++) {
          suma = data[0].entradasValue[k][j] * WyU.w[j][i];
        }
        // funcion de activacion
        if (suma - WyU.u[k] >= 0) {
          si = 1;
        } else {
          si = 0;
        }
        // el = data[1].salidasValue[k] - si;//error lineal
      }
      SI.push(si);
      el = data[1].salidasValue[k];
    }
    console.log('SI:', SI);
    // UMBRALES
    console.log('U1', WyU.u[0]);
    console.log('U2', WyU.u[1]);
    let eli = [];
    for (let i = 0; i < 1;i++) {
      for (let k = 0; k < n; k++) {
        el = data[1].salidasValue[i][k] - SI[k]; //error lineal en el patron
        eli.push(el);
      }
    }
    cont++;
    console.log('errores lineales', eli);
    let sumaeli = 0;
    for (let i = 0; i < eli.length; i++) {
      sumaeli += Math.abs(eli[i]); //suma error lineal
    }
    console.log('suma errorl', sumaeli);
    epatron.push(sumaeli / n); //error producido patron 1
    console.log('ep1', epatron);
    console.log(SI[0]);
    console.log(data[1].salidasValue[1][0]);
    // aplicando algoritmo de training
    // Wji=Wji +rata*Eli*Xj
    console.log(WyU.w);
    console.log('params', Parameters);

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
}
