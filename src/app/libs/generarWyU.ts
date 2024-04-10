export function generarValoresAleatorios(
  numEntradas: number,
  numSalidas: number
): number[][] {
  const valores: number[][] = [];
  for (let i = 0; i < numEntradas; i++) {
    const fila: number[] = [];
    for (let j = 0; j < numSalidas; j++) {
      fila.push(+(Math.random() * 2 - 1).toFixed(1)); // Genera un número aleatorio entre -1 y 1
    }
    valores.push(fila);
  }
  return valores;
}
