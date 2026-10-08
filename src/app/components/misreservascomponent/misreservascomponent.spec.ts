import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Misreservascomponent } from './misreservascomponent';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
describe('Misreservascomponent', () => {
  let component: Misreservascomponent;
  let fixture: ComponentFixture<Misreservascomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Misreservascomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
