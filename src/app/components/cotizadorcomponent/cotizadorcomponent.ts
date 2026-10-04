import { Component, Input } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento';

@Component({
  selector: 'app-cotizadorcomponent',
  standalone: false,
  templateUrl: './cotizadorcomponent.html',
  styleUrl: './cotizadorcomponent.css',
})
export class Cotizadorcomponent {
  @Input() alojamiento!: Alojamiento;

  hoy: string = this.obtenerHoy();

  fechaLlegada: string = '';
  fechaSalida: string = '';
  huespedes: number = 1;

  mensajeError: string = '';
  cotizacionValida: boolean = false;

  noches: number = 0;
  subtotal: number = 0;
  tarifaLimpieza: number = 0;
  tarifaServicio: number = 0;
  total: number = 0;

  // Fecha de hoy en formato AAAA-MM-DD (el mismo que usa <input type="date">)
  obtenerHoy(): string {
    const fecha = new Date();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return fecha.getFullYear() + '-' + mes + '-' + dia;
  }

  // Valida las reglas del PDF y devuelve el error, o '' si todo está bien
  validar(): string {
    if (!this.fechaLlegada || !this.fechaSalida) {
      return 'Seleccione la fecha de llegada y la fecha de salida.';
    }
    if (this.fechaLlegada < this.hoy) {
      return 'La fecha de llegada no puede ser anterior a hoy.';
    }
    if (this.fechaSalida <= this.fechaLlegada) {
      return 'La fecha de salida debe ser posterior a la fecha de llegada.';
    }
    if (!this.huespedes || this.huespedes <= 0) {
      return 'El número de huéspedes debe ser mayor que cero.';
    }
    if (this.huespedes > this.alojamiento.capacidad) {
      return 'Este alojamiento admite máximo ' + this.alojamiento.capacidad + ' huéspedes.';
    }
    if (this.alojamiento.precioNoche <= 0) {
      return 'El precio por noche del alojamiento no es válido.';
    }
    return '';
  }

  cotizar(): void {
    this.cotizacionValida = false;
    this.mensajeError = this.validar();
    if (this.mensajeError !== '') {
      return;
    }

    const unDia = 1000 * 60 * 60 * 24;
    const llegada = new Date(this.fechaLlegada).getTime();
    const salida = new Date(this.fechaSalida).getTime();

    this.noches = Math.round((salida - llegada) / unDia);
    this.subtotal = this.noches * this.alojamiento.precioNoche;
    this.tarifaLimpieza = this.alojamiento.tarifaLimpieza;
    this.tarifaServicio = this.subtotal * 0.1;
    this.total = this.subtotal + this.tarifaLimpieza + this.tarifaServicio;
    this.cotizacionValida = true;
  }

  // Si el usuario cambia algún dato, la cotización anterior deja de ser válida
  cambiarDatos(): void {
    this.cotizacionValida = false;
  }
}
