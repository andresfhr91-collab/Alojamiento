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
  statuscode: number = 0;
  mensajeError: string = '';

  ngOnInit(): void {
    this.alojamientosService.getDatos().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const todos = response.body?.alojamientos ?? [];
        this.alojamientos = todos.filter((alojamiento) => alojamiento.activo);
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los alojamientos.';
        this.cdr.markForCheck();
      },
    });
  }
}
