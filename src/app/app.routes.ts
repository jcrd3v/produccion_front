import { Routes } from '@angular/router';
import { Autenticacion } from './pages/autenticacion/autenticacion';
import { Almacen } from './pages/almacen/almacen';

export const routes: Routes = [
    {path:'', redirectTo:'almacen', pathMatch:'full'},
    {path: 'autenticacion', component: Autenticacion},
    {path: 'almacen', component: Almacen}
];
