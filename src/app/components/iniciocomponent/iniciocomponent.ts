import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Alojamientos } from '../../service/alojamientos';
import { Alojamiento } from '../../models/alojamiento';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  templateUrl: './iniciocomponent.html',
  styleUrl: './iniciocomponent.css',
})
export class Iniciocomponent implements OnInit {
  private alojamientosService = inject(Alojamientos);
  private cdr = inject(ChangeDetectorRef);

  destacados: Alojamiento[] = [];
  statuscode: number = 0;
  mensajeError: string = '';
  cargando: boolean = true;
  ngOnInit(): void {
    this.alojamientosService.getDatos().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const todos = response.body?.alojamientos ?? [];
        const activos = todos.filter((alojamiento) => alojamiento.activo);
        activos.sort((a, b) => b.calificacion - a.calificacion);
        this.destacados = activos.slice(0, 3);
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
}
