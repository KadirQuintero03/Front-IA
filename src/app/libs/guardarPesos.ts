
export function GuardarPesos(w: number[][], u: number[]) {

  try {
    const pesos = JSON.stringify(w);
    localStorage.setItem('w', pesos);
    const umbrales = JSON.stringify(u);
    localStorage.setItem('u', umbrales);
    const WyU = {
      valueW: w,
      valueU: u,
    };
  } catch (error) {
    console.log(error);
  }
}
