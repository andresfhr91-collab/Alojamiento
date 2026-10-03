import { Component, Input } from '@angular/core';
import { Alojamiento } from '../../models/alojamiento';

@Component({
  selector: 'app-tarjetacomponent',
  standalone: false,
  templateUrl: './tarjetacomponent.html',
  styleUrl: './tarjetacomponent.css',
})
export class Tarjetacomponent {
  @Input() alojamiento!: Alojamiento;
}
