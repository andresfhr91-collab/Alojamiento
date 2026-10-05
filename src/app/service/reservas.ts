import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class Reservas {
  private readonly CLAVE: string = 'reservasAlojamiento';
  private reservas: Reserva[] = this.cargarReservas();

  // trae las reservas que quedaron guardadas en el localStorage, si no hay ninguna arranca vacio
  private cargarReservas(): Reserva[] {
    const guardadas = localStorage.getItem(this.CLAVE);
    if (!guardadas) {
      return [];
    }
    try {
      return JSON.parse(guardadas);
    } catch {
      // si el dato esta dañado no se rompe la app
      return [];
    }
  }

  // guarda la lista en el localStorage como texto (por eso el stringify)
  private guardarReservas(): void {
    localStorage.setItem(this.CLAVE, JSON.stringify(this.reservas));
  }

  getReservas(): Reserva[] {
    return this.reservas;
  }

  // le pone id y estado CONFIRMADA a la reserva y la guarda
  agregarReserva(reserva: Reserva): void {
    reserva.id = this.reservas.length + 1;
    reserva.estado = 'CONFIRMADA';
    this.reservas.push(reserva);
    this.guardarReservas();
  }
}
