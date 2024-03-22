export const north = [
  {
    x: 1,
    y: 0.5,
  },
  {
    x: 2,
    y: 0.75,
  },
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
  {
    x: 2004,
    y: 318,
  },
  {
    x: 2005,
    y: 330,
  },
  {
    x: 2006,
    y: 355,
  },
  {
    x: 2007,
    y: 366,
  },
  {
    x: 2008,
    y: 337,
  },
  {
    x: 2009,
    y: 352,
  },
  {
    x: 2010,
    y: 377,
  },
  {
    x: 2011,
    y: 383,
  },
  {
    x: 2012,
    y: 344,
  },
  {
    x: 2013,
    y: 366,
  },
  {
    x: 2014,
    y: 389,
  },
  {
    x: 2015,
    y: 334,
  },
];

for (let i = 0; i < 100; i++) {}
type ObjetoXY = {
  x: number;
  y: number;
};

// Ahora declaramos el array con ese tipo
export const arrayObjetos: ObjetoXY[] = [];

export function mostrar() {
  // Llenamos el array con objetos que tienen propiedades x e y
  for (let i = 0; i < 10; i++) {
    const objeto = {
      x: i,
      y: parseFloat((1 / Math.pow(2, i)).toFixed(5)), // Hacemos que y tienda a 0 con solo 3 decimales
    };
    arrayObjetos.push(objeto);
  }
  console.log(arrayObjetos);
}
