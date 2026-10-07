import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Alojamientos } from '../../service/alojamientos';
import { Alojamiento } from '../../models/alojamiento';

@Component({
  selector: 'app-listadocomponent',
  standalone: false,
  templateUrl: './listadocomponent.html',
  styleUrl: './listadocomponent.css',
})
export class Listadocomponent implements OnInit {
  private alojamientosService = inject(Alojamientos);
  private cdr = inject(ChangeDetectorRef);

  alojamientos: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];
  statuscode: number = 0;
  mensajeError: string = '';
  cargando: boolean = true;

  filtroCiudad: string = '';
  filtroTipo: string = '';
  filtroHuespedes: number = 0;
  filtroPrecioMaximo: number = 0;
  orden: string = '';

  ngOnInit(): void {
    this.alojamientosService.getDatos().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const todos = response.body?.alojamientos ?? [];
        this.alojamientos = todos.filter((alojamiento) => alojamiento.activo);
        this.cargarOpciones();
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los alojamientos.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }

  // saca las ciudades y los tipos para llenar los select, sin repetir
  cargarOpciones(): void {
    for (const alojamiento of this.alojamientos) {
      if (!this.ciudades.includes(alojamiento.ciudad)) {
        this.ciudades.push(alojamiento.ciudad);
      }
      if (!this.tipos.includes(alojamiento.tipo)) {
        this.tipos.push(alojamiento.tipo);
      }
    }
  }
  // filtra con lo que el usuario selecciono (si un filtro esta vacio no cuenta) y despues ordena
  filtrar(): Alojamiento[] {
    const resultado = this.alojamientos.filter((alojamiento) => {
      if (this.filtroCiudad && alojamiento.ciudad !== this.filtroCiudad) {
        return false;
      }
      if (this.filtroTipo && alojamiento.tipo !== this.filtroTipo) {
        return false;
      }
      if (this.filtroHuespedes && alojamiento.capacidad < this.filtroHuespedes) {
        return false;
      }
      if (this.filtroPrecioMaximo && alojamiento.precioNoche > this.filtroPrecioMaximo) {
        return false;
      }
      return true;
    });

    if (this.orden === 'precioMenor') {
      resultado.sort((a, b) => a.precioNoche - b.precioNoche);
    }
    if (this.orden === 'precioMayor') {
      resultado.sort((a, b) => b.precioNoche - a.precioNoche);
    }
    if (this.orden === 'calificacion') {
      resultado.sort((a, b) => b.calificacion - a.calificacion);
    }
    return resultado;
  }

  limpiarFiltros(): void {
    this.filtroCiudad = '';
    this.filtroTipo = '';
    this.filtroHuespedes = 0;
    this.filtroPrecioMaximo = 0;
    this.orden = '';
  }
}
