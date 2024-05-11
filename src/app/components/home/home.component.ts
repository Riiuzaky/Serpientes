import { Component } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatRadioModule,MatButtonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cantidadJugadores = 2;

  constructor(private router: Router) { }


  start(cantidadJugadores: number){
    this.router.navigate(['juego',cantidadJugadores]);
  }


}
