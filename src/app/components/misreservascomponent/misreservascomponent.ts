import { Component, inject, OnInit } from '@angular/core';
import { Reservas } from '../../service/reservas';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  templateUrl: './misreservascomponent.html',
  styleUrl: './misreservascomponent.css',
})
export class Misreservascomponent implements OnInit {
  private reservasService = inject(Reservas);

  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.reservas = this.reservasService.getReservas();
  }
}
