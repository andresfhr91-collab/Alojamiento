import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clima } from '../models/clima';
import { Festivo } from '../models/festivo';
import { TasaCambio } from '../models/tasacambio';

@Injectable({ providedIn: 'root' })
export class Apisexternas {
  private cliente = inject(HttpClient);
  private readonly URL_CLIMA: string = 'https://api.open-meteo.com/v1/forecast';
  private readonly URL_FESTIVOS: string = 'https://date.nager.at/api/v3/PublicHolidays/';
  private readonly URL_CAMBIO: string = 'https://open.er-api.com/v6/latest/COP';

  getClima(latitud: number, longitud: number) {
    return this.cliente.get<Clima>(
      this.URL_CLIMA + '?latitude=' + latitud + '&longitude=' + longitud +
      '&current=temperature_2m,weather_code&timezone=America/Bogota',
      { observe: 'response' }
    );
  }

  getFestivos(anio: number) {
    return this.cliente.get<Festivo[]>(this.URL_FESTIVOS + anio + '/CO', { observe: 'response' });
  }

  getTasaCambio() {
    return this.cliente.get<TasaCambio>(this.URL_CAMBIO, { observe: 'response' });
  }

  // Convierte el código de clima de Open-Meteo en un texto en español
  describirClima(codigo: number): string {
    if (codigo === 0) {
      return 'Despejado';
    }
    if (codigo <= 3) {
      return 'Parcialmente nublado';
    }
    if (codigo <= 48) {
      return 'Niebla';
    }
    if (codigo <= 57) {
      return 'Llovizna';
    }
    if (codigo <= 82) {
      return 'Lluvia';
    }
    return 'Tormenta';
  }
}
