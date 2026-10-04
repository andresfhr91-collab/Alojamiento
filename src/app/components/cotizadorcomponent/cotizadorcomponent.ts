import { Component, inject, Input, OnInit } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento';
import { Reserva } from '../../models/reserva';
import { Festivo } from '../../models/festivo';
import { Reservas } from '../../service/reservas';
import { Apisexternas } from '../../service/apisexternas';

@Component({
  selector: 'app-cotizadorcomponent',
  standalone: false,
  templateUrl: './cotizadorcomponent.html',
  styleUrl: './cotizadorcomponent.css',
})
export class Cotizadorcomponent implements OnInit {
  @Input() alojamiento!: Alojamiento;

  private reservasService = inject(Reservas);
  private apisService = inject(Apisexternas); // NUEVO

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

  nombreHuesped: string = '';
  correo: string = '';
  mensajeErrorReserva: string = '';
  mensajeExito: string = '';

  // NUEVO: festivos y dólares
  festivos: Festivo[] = [];
  festivosEstadia: Festivo[] = [];
  tasaUSD: number = 0;
  totalUSD: number = 0;

  // NUEVO: al cargar el cotizador se consultan los festivos y la tasa de cambio
  ngOnInit(): void {
    const anio = new Date().getFullYear();
    this.cargarFestivos(anio);
    this.cargarFestivos(anio + 1);

    this.apisService.getTasaCambio().subscribe({
      next: (response) => {
        this.tasaUSD = response.body?.rates.USD ?? 0;
      },
      error: () => {
        this.tasaUSD = 0;
      },
    });
  }

  // NUEVO: trae los festivos de Colombia de un año y los agrega a la lista
  cargarFestivos(anio: number): void {
    this.apisService.getFestivos(anio).subscribe({
      next: (response) => {
        const lista = response.body ?? [];
        for (const festivo of lista) {
          this.festivos.push(festivo);
        }
      },
      error: () => {
        // Si falla, simplemente no se muestran festivos
      },
    });
  }

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
    this.mensajeExito = '';
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

    // NUEVO: festivos que caen en alguna noche de la estadía y total en dólares
    this.festivosEstadia = this.festivos.filter(
      (festivo) => festivo.date >= this.fechaLlegada && festivo.date < this.fechaSalida
    );
    this.totalUSD = this.total * this.tasaUSD;

    this.cotizacionValida = true;
  }

  // Si el usuario cambia algún dato, la cotización anterior deja de ser válida
  cambiarDatos(): void {
    this.cotizacionValida = false;
  }

  // Registra la reserva simulada (solo si hay una cotización válida)
  reservar(): void {
    this.mensajeErrorReserva = '';

    if (!this.cotizacionValida) {
      this.mensajeErrorReserva = 'Primero debe generar una cotización válida.';
      return;
    }
    if (this.nombreHuesped.trim() === '') {
      this.mensajeErrorReserva = 'Ingrese el nombre del huésped.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo.trim())) {
      this.mensajeErrorReserva = 'Ingrese un correo electrónico válido.';
      return;
    }

    const reserva: Reserva = {
      id: 0,
      alojamientoId: this.alojamiento.id,
      alojamientoNombre: this.alojamiento.nombre,
      ciudad: this.alojamiento.ciudad,
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida,
      huespedes: this.huespedes,
      noches: this.noches,
      total: this.total,
      nombreHuesped: this.nombreHuesped.trim(),
      correo: this.correo.trim(),
      estado: '',
    };

    this.reservasService.agregarReserva(reserva);
    this.mensajeExito = 'Reserva #' + reserva.id + ' ' + reserva.estado + ' a nombre de ' + reserva.nombreHuesped + '.';

    this.cotizacionValida = false;
    this.fechaLlegada = '';
    this.fechaSalida = '';
    this.huespedes = 1;
    this.nombreHuesped = '';
    this.correo = '';
  }
}
