export const north = [
  {
    x: 1998,
    y: 329,
  },
  {
    x: 1999,
    y: 342,
  },
  {
    x: 2000,
    y: 348,
  },
  {
    x: 2001,
    y: 334,
  },
  {
    x: 2002,
    y: 325,
  },
  {
    x: 2003,
    y: 316,
  },
];

for (let i = 0; i < 100; i++) {}
export type ObjetoXY = {
  x: number;//itercaion
  y: number;//error en la iteracion
};

// Ahora declaramos el array con ese tipo
export const arrayObjetos: ObjetoXY[] = [];

export function mostrar(data:any[]) {
  console.log("data mostrar",data);
  
  // Llenamos el array con objetos que tienen propiedades x e y
  for (let i = 0; i < data.length; i++) {
    const objeto = {
      x: i,
      y: data[i], // Hacemos que y tienda a 0 con solo 3 decimales
    };
    arrayObjetos.push(objeto);
  }
  // console.log(arrayObjetos);
}
