import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alojamientos } from '../../service/alojamientos';
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
  private cdr = inject(ChangeDetectorRef);

  alojamiento: Alojamiento | undefined = undefined;
  resenas: Resena[] = [];
  statuscode: number = 0;
  cargando: boolean = true;
  mensajeError: string = '';

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
        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError = 'No se pudo cargar la información del alojamiento.';
        this.cargando = false;
        this.cdr.markForCheck();
      },
    });
  }
}
