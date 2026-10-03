import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjetacomponent } from './tarjetacomponent';

describe('Tarjetacomponent', () => {
  let component: Tarjetacomponent;
  let fixture: ComponentFixture<Tarjetacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tarjetacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjetacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
