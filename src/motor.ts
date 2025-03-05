import {  Carta ,Tablero } from './modelo'
/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const barajarCartas = (cartas: Carta[]): Carta[] => {
  //...
  for (let i = cartas.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas
}

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  //..
  const carta = tablero.cartas[indice]
  return carta.encontrada === false && carta.estaVuelta === false && tablero.estadoPartida !== 'DosCartasLevantadas'
}

export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  //...
  tablero.cartas = tablero.cartas.map((carta, i) =>
    i === indice ? { ...carta, estaVuelta: true } : carta
  );

}

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  //...
  console.log(
    `Comparando idFoto: ${tablero.cartas[indiceA].idFoto} vs ${tablero.cartas[indiceB].idFoto}`
  );
  return  tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto

}

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  //...
 tablero.cartas[indiceA].encontrada = true
 tablero.cartas[indiceB].encontrada = true
 console.log(esPartidaCompleta(tablero))
}

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  // ...
  const cartaA = tablero.cartas[indiceA]
  const cartaB = tablero.cartas[indiceB]
  cartaA.estaVuelta = false
  cartaB.estaVuelta = false
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  //...
  return tablero.cartas.every(carta => carta.encontrada)
}

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  //...
  tablero.estadoPartida = 'CeroCartasLevantadas'
  barajarCartas(tablero.cartas)
};