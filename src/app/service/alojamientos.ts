import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../models/datos';

@Injectable({
  providedIn: 'root',
})
export class Alojamientos {
  private cliente = inject(HttpClient);
  private readonly url: string = 'data/data.json';

  getDatos() {
    return this.cliente.get<Datos>(this.url, { observe: 'response' });
  }
}
