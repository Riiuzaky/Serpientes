import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JuegoComponent } from './components/juego/juego.component';

export const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: JuegoComponent
    }

];
