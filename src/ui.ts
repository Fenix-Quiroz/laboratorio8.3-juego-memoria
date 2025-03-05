import { partida, tablero } from "./modelo";
import {
  esPartidaCompleta,
  iniciaPartida,
  parejaEncontrada,
  parejaNoEncontrada,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
} from "./motor";
export const mostrarIntentos = () => {
  const divIntentos = document.getElementById("intentos");
  if (divIntentos instanceof HTMLDivElement) {
    divIntentos.innerHTML = `Llevas ${partida.intentos} intentos.`;
  }
};

const mostrarMensaje = (mensaje: string): void => {
  const elementoMensaje = document.getElementById("mensaje");
  if (elementoMensaje) {
    elementoMensaje.innerHTML = mensaje;
  }
};
export const recorrerCartas = () => {
  const divCarta = document.querySelectorAll(".carta");
  divCarta.forEach((carta) => {
    carta.addEventListener("click", () => {
      const indiceCarta = Number(carta.getAttribute("data-indice-carta"));
      const divCartaImagen = carta.firstElementChild;
      if (divCartaImagen && divCartaImagen instanceof HTMLImageElement) {
        const indiceImagen = Number(
          divCartaImagen.getAttribute("data-indice-imagen")
        );
        manejarVolteoDeCarta(indiceCarta, divCartaImagen, indiceImagen, carta);
      }
    });
  });
};

const resetearElEstadoPartida = (): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};
const animacionesAlVoltearCarta = (carta: Element): void => {
  carta.classList.add("animacion-voltear-carta");
  carta.classList.add("cambiar-color-fondo");
};

const eliminarClasesDeAnimaciones = () :void => {
  const cartaA = document.querySelector(
    `.carta:nth-child(${tablero.indiceCartaVolteadaA! + 1}) `
  );
  const cartaB = document.querySelector(
    `.carta:nth-child(${tablero.indiceCartaVolteadaB! + 1}) `
  );
  if (cartaA && cartaB) {
    cartaA.classList.remove("animacion-voltear-carta");
    cartaB.classList.remove("animacion-voltear-carta");
    cartaA.classList.remove("cambiar-color-fondo");
    cartaB.classList.remove("cambiar-color-fondo");
  }
};
const ocultarImagenesDeParejaIncorrecta = (): void => {
  const cartaA = document.querySelector(
    `.carta:nth-child(${tablero.indiceCartaVolteadaA! + 1}) img`
  );
  const cartaB = document.querySelector(
    `.carta:nth-child(${tablero.indiceCartaVolteadaB! + 1}) img`
  );

  if (
    cartaA &&
    cartaA instanceof HTMLImageElement &&
    cartaB &&
    cartaB instanceof HTMLImageElement
  ) {
    cartaA.src = "";
    cartaB.src = "";
  }
};

const verificacionDeParejas = (carta: Element) : void => {
  if (
    sonPareja(
      tablero.indiceCartaVolteadaA!,
      tablero.indiceCartaVolteadaB!,
      tablero
    )
  ) {
    parejaEncontrada(
      tablero,
      tablero.indiceCartaVolteadaA!,
      tablero.indiceCartaVolteadaB!
    );
    if (esPartidaCompleta(tablero)) {
      activarBotonReiniciarPartida();
      mostrarMensaje("Felicidades encontraste todas las parejas");
    }
    resetearElEstadoPartida();
  } else {
    partida.intentos++;
    setTimeout(() => {
      parejaNoEncontrada(
        tablero,
        tablero.indiceCartaVolteadaA!,
        tablero.indiceCartaVolteadaB!
      );
      mostrarIntentos();
      ocultarImagenesDeParejaIncorrecta();
      animacionesAlVoltearCarta(carta);
      eliminarClasesDeAnimaciones();

      resetearElEstadoPartida();
    }, 1000);
  }
};

export const manejarVolteoDeCarta = (
  indiceCarta: number,
  imagenCarta: HTMLImageElement,
  indiceImagen: number,
  carta: Element
): void => {
  if (sePuedeVoltearLaCarta(tablero, indiceCarta)) {
    voltearLaCarta(tablero, indiceCarta);
    animacionesAlVoltearCarta(carta);
    console.log(imagenCarta);
    console.log(carta);
    imagenCarta.src = tablero.cartas[indiceImagen].imagen;
    mostrarMensaje("");
  } else {
    mostrarMensaje("Esta carta ya esta volteada.");
    return;
  }

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indiceCarta;
    tablero.estadoPartida = "UnaCartaLevantada";
    return;
  }
  if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indiceCarta;
    tablero.estadoPartida = "DosCartasLevantadas";
    verificacionDeParejas(carta);
  }
};

export const mostrarBotonReiniciarPartida = () => {
  const botonReiniciarPartida = document.getElementById("reiniciar-partida");
  if (botonReiniciarPartida instanceof HTMLButtonElement) {
    botonReiniciarPartida.style.display = "flex";
    botonReiniciarPartida.disabled = true;
  }
};

const activarBotonReiniciarPartida = () => {
  const botonReiniciarPartida = document.getElementById("reiniciar-partida");
  if (botonReiniciarPartida instanceof HTMLButtonElement) {
    botonReiniciarPartida.disabled = false;
  }
};
const eliminarClasesAlCompletarPartida = () => {
  const divcartas = document.querySelectorAll(".carta");
  divcartas.forEach((carta) => {
    carta.classList.remove("cambiar-color-fondo");
    carta.classList.remove("animacion-voltear-carta");
  });
};
export const reiniciarPartida = () => {
  const contenedorCartas = document.getElementById("contenedor-cartas");
  const cartas = document.querySelectorAll(".carta img");
  const divIntentos = document.getElementById("intentos");
  eliminarClasesAlCompletarPartida();

  if (
    contenedorCartas instanceof HTMLDivElement &&
    divIntentos instanceof HTMLDivElement &&
    cartas
  ) {
    contenedorCartas.style.display = "none";
    divIntentos.style.display = "none";
    iniciaPartida(tablero);
    resetearElEstadoPartida();
    mostrarMensaje("");
    cartas.forEach((carta) => {
      if (carta instanceof HTMLImageElement) {
        carta.src = "";
      }
    });
    tablero.cartas.forEach((carta) => {
      (carta.estaVuelta = false), (carta.encontrada = false);
    });
    contenedorCartas.style.display = "flex";
    divIntentos.style.display = "block";
    partida.intentos = 0;
    mostrarIntentos();
  }
};
