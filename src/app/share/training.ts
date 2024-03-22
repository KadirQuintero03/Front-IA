import { variables } from '../interface/variables';

export function entrenar(
  data: any,
  Parameters: variables,
  WyU: any,
  m: number,
  n: number
) {
  WyU.w = [
    [0.9, 0.6],
    [0.9, 0.2],
    [0.2, 0.1],
  ];
  // primer patron
  console.log('entradas', data[0].entradasValue[1]);
  console.log('salidas', data[1].salidasValue);
  // salida primer patron
  // console.log("salidas",data[1].salidasValue);
  // salida de la red en el primer patron S1=(s1*w11+s2*w21+s3*w31)
  // s1=data[0].entradasValue[0][0]
  // s2=data[0].entradasValue[0][1]
  // s3=data[0].entradasValue[0][2]
  console.log('s1', data[0].entradasValue[0][0]);
  // pesos
  // W11=WyU.w[0][0]
  // W21=WyU.w[1][0]
  // W31=WyU.w[2][0]
  // S1=((data[0].entradasValue[0][0]*WyU.w[0][0])+(data[0].entradasValue[0][1]*WyU.w[1][0])+(data[0].entradasValue[0][2]*WyU.w[2][0]))
  // J AUMENTA I=1
  // salida de la red en el primer patron S2=(s1*w12+s2*w22+s3*w32)
  console.log('p', WyU.w);
  let suma = 0;
  let SI = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      console.log("i",i);
      
      // console.log(`peso ${j},${i} `, WyU.w[j][k]);
      // console.log('S1F', data[0].entradasValue[j][i] * WyU.w[j][i]);
      suma = data[0].entradasValue[0][j] * WyU.w[j][i];
      console.log("suma",suma);
      
      // console.log(`entrada `, data[0].entradasValue[j][i]);
      // console.log('S', j, data[0].entradasValue[i][j] * WyU.w[j][i]);
    }
    SI.push(suma);
    
    // break;
  }

  console.log('s11 suma', suma);
  console.log('SI:', SI);

  console.log(
    'S11=',
    data[0].entradasValue[1][0] * WyU.w[0][1] +
      data[0].entradasValue[1][1] * WyU.w[1][1] +
      data[0].entradasValue[1][2] * WyU.w[2][1]
  );
  console.log('W11', WyU.w[0][0]);
  console.log('W21', WyU.w[1][0]);
  console.log('W31', WyU.w[2][0]);
  console.log('-----------------');
  console.log('W12', WyU.w[0][1]);
  console.log('W22', WyU.w[1][1]);
  console.log('W32', WyU.w[2][1]);
  // S2=((data[0].entradasValue[0][0]*WyU.w[0][1])+(data[0].entradasValue[0][1]*WyU.w[1][1])+(data[0].entradasValue[0][3]*WyU.w[2][1]))
  // J AUMNETA I=2
  console.log('u', WyU.u);
  console.log('entre');
  console.log(data, 'params', Parameters);
  console.log('pyu', WyU);
}
