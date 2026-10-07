import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Listadocomponent } from './components/listadocomponent/listadocomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';
const routes: Routes = [
  { path: '', component: Iniciocomponent },
  { path: 'alojamientos', component: Listadocomponent },
  { path: 'alojamientos/:id', component: Detallecomponent },
  { path: 'reservas', component: Misreservascomponent },
  { path: '**', component: Noencontradocomponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
