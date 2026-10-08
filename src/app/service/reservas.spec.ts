import { TestBed } from '@angular/core/testing';
import { Reservas } from './reservas';
import { Reserva } from '../models/reserva';

describe('Reservas', () => {
  let service: Reservas;

  // reserva de prueba, el id y el estado los pone el servicio
  function reservaDePrueba(): Reserva {
    return {
      id: 0,
      alojamientoId: 1,
      alojamientoNombre: 'Loft moderno en Chapinero',
      ciudad: 'Bogotá',
      fechaLlegada: '2099-01-10',
      fechaSalida: '2099-01-13',
      huespedes: 2,
      noches: 3,
      total: 639000,
      nombreHuesped: 'Ana',
      correo: 'ana@correo.com',
      estado: '',
    };
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reservas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('al agregar le pone id y estado CONFIRMADA', () => {
    service.agregarReserva(reservaDePrueba());
    const reservas = service.getReservas();

    expect(reservas.length).toBe(1);
    expect(reservas[0].id).toBe(1);
    expect(reservas[0].estado).toBe('CONFIRMADA');
  });

  it('al cancelar cambia el estado a CANCELADA', () => {
    service.agregarReserva(reservaDePrueba());
    service.cancelarReserva(1);

    expect(service.getReservas()[0].estado).toBe('CANCELADA');
  });

  it('guarda las reservas en el localStorage', () => {
    service.agregarReserva(reservaDePrueba());
    const guardadas = JSON.parse(localStorage.getItem('reservasAlojamiento') || '[]');

    expect(guardadas.length).toBe(1);
  });
});
