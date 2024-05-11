import { Component, ElementRef, ViewChild } from '@angular/core';
import * as preguntasJson from './../../../assets/files/preguntas.json';
import { ActivatedRoute,Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.scss',
})
export class JuegoComponent {
  @ViewChild('player') myPlayer!: ElementRef;
  title = 'ProyectoEscaleras';
  sum = 0;
  dadosValue = 0;
  audio = new Audio('./../../../assets/sounds/sonidoDados.mp3');
  audioWin = new Audio('./../../../assets/sounds/Win.mp3');
  turno = 1;
  CantidadJugadores: number;
  turnoActual = 0;
  ganador = '';

  cuestionario = preguntasJson;
 


  jugadores = [
    {
      nombre: 'Jugador 1',
      preguntasAcertadas: 0,
      preguntasFalladas: 0,
      suma: 0,
    },
    {
      nombre: 'Jugador 2',
      preguntasAcertadas: 0,
      preguntasFalladas: 0,
      suma: 0,
    },
    {
      nombre: 'Jugador 3',
      preguntasAcertadas: 0,
      preguntasFalladas: 0,
      suma: 0,
    },
    {
      nombre: 'Jugador 4',
      preguntasAcertadas: 0,
      preguntasFalladas: 0,
      suma: 0,
    },
  ];

  constructor(private route: ActivatedRoute,private router: Router) {
    this.CantidadJugadores = this.route.snapshot.params['cantidadJugadores'];
  }


 
  

  lanzar() {
    this.audio.play();
    this.dadosValue = Math.floor(Math.random() * 6) + 1;

    if((this.turno) % this.CantidadJugadores === 0) {
      this.turnoActual = this.CantidadJugadores;
      this.turno = 1;
    }else{
      this.turnoActual = this.turno
      this.turno =((this.turno) % this.CantidadJugadores)+1
    }

   
    
    const player = document.getElementById(`player${this.turno}`);
    if (player) {
      player.style.display = 'initial';
    }
    
    const diceElement = document.getElementById('dice');
    if (diceElement) {
      diceElement.textContent = this.dadosValue.toString();
    }
    const acertadas = document.getElementById('acertadas');
    const falladas = document.getElementById('falladas');
   

    if (acertadas && falladas) {
      acertadas.textContent = `Preguntas acertadas: ${
        this.jugadores[this.turno-1].preguntasAcertadas
      }`;
      falladas.textContent = `Preguntas falladas: ${
        this.jugadores[this.turno-1].preguntasFalladas
      }`;
    }
    const turnoElement = document.getElementById('Turno-jugador');
    if (turnoElement) {
      turnoElement.style.display = 'none';
    }
    this.play(this.dadosValue, this.turno);
  }

  reset() {
    this.router.navigate(['/']);
  }

  play(dadosLanzados: number, turno: number) {
    this.jugadores[turno-1].suma =
      this.jugadores[turno-1 ].suma + dadosLanzados;

    if (this.jugadores[turno-1 ].suma > 49) {
      this.jugadores[turno-1].suma =
        this.jugadores[turno-1].suma - dadosLanzados;
        this.cambiarTurno()
        return
    }

    if (this.jugadores[turno-1 ].suma === 2) {
      this.jugadores[turno-1].suma = 12;
    }
    if (this.jugadores[turno-1 ].suma === 8) {
      this.jugadores[turno-1].suma =20;
    }
    if (this.jugadores[turno-1 ].suma === 33) {
      this.jugadores[turno-1].suma = 37;
    }
    if (this.jugadores[turno-1 ].suma === 25) {
      this.jugadores[turno-1].suma = 19;
    }
    if (this.jugadores[turno-1 ].suma === 30) {
      this.jugadores[turno-1].suma = 26;
    }
    if (this.jugadores[turno-1 ].suma === 45) {
      this.jugadores[turno-1].suma = 41;
    }


    const player = document.getElementById(`player${turno}`);

    if (player) {
      player.style.transition = `linear all .5s`;

      if (this.jugadores[turno-1].suma === 49) {
        // Si llegamos a la casilla 49
        this.ganar();
       
      } else if (this.jugadores[turno-1].suma < 49) {
        this.moverFicha(turno, player);
      }
    }
  }

  moverFicha(turno: number, player: any) {
    const contenedor = document.getElementById('cont');
        const row = Math.floor((this.jugadores[turno-1].suma - 1) / 7);
        const col = (this.jugadores[turno-1].suma - 1) % 7;

        let horizontalPosition: number;
        if (row % 2 === 0) {
          horizontalPosition = col * ((contenedor?.offsetWidth ?? 0) / 7 + 4);
        } else {
          horizontalPosition =
            (6 - col) * ((contenedor?.offsetWidth ?? 0) / 7 + 4);
        }

        player.style.left = `${horizontalPosition}px`;

        player.style.top = `${
          row * -((contenedor?.offsetHeight ?? 0) / 7 - 4)
        }px`;

        this.mostrarPreguntas(this.jugadores[this.turno-1].suma);
  }

  ganar() {
    this.audioWin.play();
    const diceElement = document.getElementById('diceBtn');
    const contenedorDados = document.getElementById('contenedor-dados');
    if (diceElement && contenedorDados) {
      diceElement.style.display = 'block';
      contenedorDados.style.display = 'none';
    }

    this.ganador = 'player ' + this.turnoActual;




    if(this.jugadores[2].preguntasAcertadas === 0 && this.jugadores[2].preguntasFalladas === 0){
      const card2 = document.getElementById('card3');
      if (card2) {
        card2.style.display = 'none';
      }
    }

    if(this.jugadores[3].preguntasAcertadas === 0 && this.jugadores[3].preguntasFalladas === 0){
      const card3 = document.getElementById('card4');
      if (card3) {
        card3.style.display = 'none';
      }
    }
   

    const contenedorTablero = document.getElementById('contenedor-tablero');
    const contenedorWin = document.getElementById('win');

    if (contenedorTablero && contenedorWin) {
      contenedorTablero.style.display = 'none';
      contenedorWin.style.display = 'flex';
    }
    alert('Fin del juego!');
  }


  mostrarPreguntas(suma: number) {
    suma = suma - 1;
    const preguntas = document.getElementById('pregunta');
    const opcioneA = document.getElementById('pA');
    const opcioneB = document.getElementById('pB');
    const opcioneC = document.getElementById('pC');
    const opcioneD = document.getElementById('pD');
    const butonA = document.getElementById('A');
    const butonB = document.getElementById('B');
    const butonC = document.getElementById('C');
    const butonD = document.getElementById('D');

    const dados = document.getElementById('dice');
    if (dados) {
      dados.style.display = 'block';
    }

    if (
      preguntas &&
      opcioneA &&
      opcioneB &&
      opcioneC &&
      opcioneD &&
      butonA &&
      butonB &&
      butonC &&
      butonD
    ) {
      preguntas.style.display = 'block';
      opcioneA.style.display = 'block';
      opcioneB.style.display = 'block';
      opcioneC.style.display = 'block';
      opcioneD.style.display = 'block';
      butonA.style.display = 'block';
      butonB.style.display = 'block';
      butonC.style.display = 'block';
      butonD.style.display = 'block';
      preguntas.textContent = this.cuestionario.preguntas[suma].pregunta;
      opcioneA.textContent = this.cuestionario.preguntas[suma].A;
      opcioneB.textContent = this.cuestionario.preguntas[suma].B;
      opcioneC.textContent = this.cuestionario.preguntas[suma].C;
      opcioneD.textContent = this.cuestionario.preguntas[suma].D;
    }
    const lanzar = document.getElementById('diceBtn');
    if (lanzar) {
      lanzar.style.display = 'none';
    }
  }

  contestarPreguntas(turno: number, opcion: string) {
    let suma = this.jugadores[turno-1].suma;
    suma = suma - 1;
    if (this.cuestionario.preguntas[suma].respuesta === opcion) {
      alert('¡Correcto!');
      this.jugadores[turno-1].preguntasAcertadas =
        this.jugadores[turno-1].preguntasAcertadas + 1;
    } else {
      alert('¡Incorrecto!');
      this.jugadores[turno-1].preguntasFalladas =
        this.jugadores[turno-1].preguntasFalladas + 1;
    }

    const turnoElement = document.getElementById('Turno-jugador');
    if (turnoElement) {
      turnoElement.style.display = 'block';
    }

    const lanzar = document.getElementById('diceBtn');
    if (lanzar) {
      lanzar.style.display = 'block';
    }

    const acertadas = document.getElementById('acertadas');
    const falladas = document.getElementById('falladas');

    if (acertadas && falladas) {
      acertadas.textContent = `Preguntas acertadas: ${
        this.jugadores[this.turno-1].preguntasAcertadas
      }`;
      falladas.textContent = `Preguntas falladas: ${
        this.jugadores[this.turno-1].preguntasFalladas
      }`;
    }

    const preguntas = document.getElementById('pregunta');
    const opcioneA = document.getElementById('pA');
    const opcioneB = document.getElementById('pB');
    const opcioneC = document.getElementById('pC');
    const opcioneD = document.getElementById('pD');
    const butonA = document.getElementById('A');
    const butonB = document.getElementById('B');
    const butonC = document.getElementById('C');
    const butonD = document.getElementById('D');

    if (
      preguntas &&
      opcioneA &&
      opcioneB &&
      opcioneC &&
      opcioneD &&
      butonA &&
      butonB &&
      butonC &&
      butonD
    ) {
      preguntas.style.display = 'none';
      opcioneA.style.display = 'none';
      opcioneB.style.display = 'none';
      opcioneC.style.display = 'none';
      opcioneD.style.display = 'none';
      butonA.style.display = 'none';
      butonB.style.display = 'none';
      butonC.style.display = 'none';
      butonD.style.display = 'none';
    }

    const dados = document.getElementById('dice');
    if (dados) {
      dados.style.display = 'none';
    }
  }

  cambiarTurno() {
    const turnoElement = document.getElementById('Turno-jugador');
    if (turnoElement) {
      turnoElement.style.display = 'initial';
    }
  }

}
