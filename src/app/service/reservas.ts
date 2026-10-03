import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class Reservas {
  private reservas: Reserva[] = [];

  getReservas(): Reserva[] {
    return this.reservas;
  }

  agregarReserva(reserva: Reserva): void {
    reserva.id = this.reservas.length + 1;
    reserva.estado = 'CONFIRMADA';
    this.reservas.push(reserva);
  }
}
