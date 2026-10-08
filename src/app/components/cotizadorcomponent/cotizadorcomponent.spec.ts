import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Cotizadorcomponent } from './cotizadorcomponent';
import { Alojamiento } from '../../models/alojamiento';

describe('Cotizadorcomponent', () => {
  let component: Cotizadorcomponent;
  let fixture: ComponentFixture<Cotizadorcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    localStorage.clear();
    fixture = TestBed.createComponent(Cotizadorcomponent);
    component = fixture.componentInstance;
    // alojamiento de prueba con los mismos datos del loft de bogota
    component.alojamiento = {
      id: 1,
      nombre: 'Loft moderno en Chapinero',
      ciudad: 'Bogotá',
      capacidad: 2,
      precioNoche: 180000,
      tarifaLimpieza: 45000,
    } as Alojamiento;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calcula bien la cotizacion de 3 noches', () => {
    component.fechaLlegada = '2099-01-10';
    component.fechaSalida = '2099-01-13';
    component.huespedes = 2;
    component.cotizar();

    expect(component.noches).toBe(3);
    expect(component.subtotal).toBe(540000);
    expect(component.tarifaLimpieza).toBe(45000);
    expect(component.tarifaServicio).toBe(54000);
    expect(component.total).toBe(639000);
    expect(component.cotizacionValida).toBe(true);
  });

  it('no cotiza si la salida no es despues de la llegada', () => {
    component.fechaLlegada = '2099-01-10';
    component.fechaSalida = '2099-01-10';
    component.cotizar();

    expect(component.cotizacionValida).toBe(false);
    expect(component.mensajeError).toBe('La fecha de salida debe ser posterior a la fecha de llegada.');
  });

  it('no cotiza si la llegada es antes de hoy', () => {
    component.fechaLlegada = '2000-01-10';
    component.fechaSalida = '2000-01-12';
    component.cotizar();

    expect(component.cotizacionValida).toBe(false);
    expect(component.mensajeError).toBe('La fecha de llegada no puede ser anterior a hoy.');
  });

  it('no deja pasar de la capacidad del alojamiento', () => {
    component.fechaLlegada = '2099-01-10';
    component.fechaSalida = '2099-01-12';
    component.huespedes = 3;
    component.cotizar();

    expect(component.cotizacionValida).toBe(false);
    expect(component.mensajeError).toBe('Este alojamiento admite máximo 2 huéspedes.');
  });

  it('si cambian los datos toca volver a cotizar', () => {
    component.fechaLlegada = '2099-01-10';
    component.fechaSalida = '2099-01-12';
    component.huespedes = 1;
    component.cotizar();
    component.cambiarDatos();

    expect(component.cotizacionValida).toBe(false);
  });

  it('no deja reservar sin cotizar primero', () => {
    component.nombreHuesped = 'Ana';
    component.correo = 'ana@correo.com';
    component.reservar();

    expect(component.mensajeErrorReserva).toBe('Primero debe generar una cotización válida.');
  });
});
