import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetacomponent } from './tarjetacomponent';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
import { Alojamiento } from '../../models/alojamiento';

describe('Tarjetacomponent', () => {
  let component: Tarjetacomponent;
  let fixture: ComponentFixture<Tarjetacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjetacomponent);
    component = fixture.componentInstance;
    component.alojamiento = { id: 1, nombre: 'Prueba', servicios: [] } as unknown as Alojamiento;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
