import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Listadocomponent } from './components/listadocomponent/listadocomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Misreservascomponent } from './components/misreservascomponent/misreservascomponent';
import { Tarjetacomponent } from './components/tarjetacomponent/tarjetacomponent';
import { Cotizadorcomponent } from './components/cotizadorcomponent/cotizadorcomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Footercomponent,
    Iniciocomponent,
    Listadocomponent,
    Detallecomponent,
    Misreservascomponent,
    Tarjetacomponent,
    Cotizadorcomponent,
    Noencontradocomponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
