import { Routes } from '@angular/router';
import { Autenticacion } from './pages/autenticacion/autenticacion';
import { Almacen } from './pages/almacen/almacen';
import { Gerencia } from './pages/gerencia/gerencia';

export const routes: Routes = [
    {path:'', redirectTo:'autenticacion', pathMatch:'full'},
    {path: 'autenticacion', component: Autenticacion},
    {path: 'almacen', component: Almacen},
    {path: 'gerencia', component: Gerencia},
];