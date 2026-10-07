import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alojamientos } from '../../service/alojamientos';
import { Apisexternas } from '../../service/apisexternas';
import { Alojamiento } from '../../models/alojamiento';
import { Resena } from '../../models/resena';

@Component({
  selector: 'app-detallecomponent',
  standalone: false,
  templateUrl: './detallecomponent.html',
  styleUrl: './detallecomponent.css',
})
export class Detallecomponent implements OnInit {
  private route = inject(ActivatedRoute);
  private alojamientosService = inject(Alojamientos);
  private apisService = inject(Apisexternas);
  private cdr = inject(ChangeDetectorRef);

  alojamiento: Alojamiento | undefined = undefined;
  resenas: Resena[] = [];
  statuscode: number = 0;
  cargando: boolean = true;
  mensajeError: string = '';

  temperatura: number = 0;
  descripcionClima: string = '';
  climaCargado: boolean = false;
  errorClima: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.alojamientosService.getDatos().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const alojamientos = response.body?.alojamientos ?? [];
        const resenas = response.body?.resenas ?? [];
        this.alojamiento = alojamientos.find((a) => a.id === id && a.activo);
        this.resenas = resenas.filter((r) => r.alojamientoId === id);
        this.cargando = false;
        if (this.alojamiento) {
          this.cargarClima(this.alojamiento.latitud, this.alojamiento.longitud);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError = 'No se pudo cargar la información del alojamiento.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  // Consulta el clima actual de la ciudad en Open-Meteo
  cargarClima(latitud: number, longitud: number): void {
    this.apisService.getClima(latitud, longitud).subscribe({
      next: (response) => {
        const clima = response.body;
        if (clima) {
          this.temperatura = clima.current.temperature_2m;
          this.descripcionClima = this.apisService.describirClima(clima.current.weather_code);
          this.climaCargado = true;
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorClima = 'No se pudo consultar el clima en este momento.';
        this.cdr.markForCheck();
      },
    });
  }
  // suma las calificaciones de las reseñas y saca el promedio
  promedioResenas(): number {
    if (this.resenas.length === 0) {
      return 0;
    }
    let suma = 0;
    for (const resena of this.resenas) {
      suma = suma + resena.calificacion;
    }
    return suma / this.resenas.length;
  }
}
