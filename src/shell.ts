import { tablero } from "./modelo";
import { iniciaPartida } from "./motor";
import {
  mostrarIntentos,
  recorrerCartas,
  mostrarBotonReiniciarPartida,
  reiniciarPartida,
} from "./ui";
const botonIniciarPartida = document.getElementById("iniciar-partida");
const contenedorCartas = document.getElementById("contenedor-cartas");
const botonReiniciarPartida = document.getElementById("reiniciar-partida");

const mostrarTablero = () => {
  if (contenedorCartas instanceof HTMLDivElement) {
    contenedorCartas.style.display = "flex";
  }
};

if (botonIniciarPartida instanceof HTMLButtonElement) {
  botonIniciarPartida.addEventListener("click", () => {
    mostrarTablero();
    mostrarBotonReiniciarPartida();
    mostrarIntentos();
    iniciaPartida(tablero);
    recorrerCartas();
    botonIniciarPartida.style.display = "none";
  });
}

if (botonReiniciarPartida instanceof HTMLButtonElement) {
  botonReiniciarPartida.addEventListener("click", reiniciarPartida);
}
