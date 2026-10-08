import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Noencontradocomponent } from './noencontradocomponent';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AppModule } from '../../app-module';
describe('Noencontradocomponent', () => {
  let component: Noencontradocomponent;
  let fixture: ComponentFixture<Noencontradocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Noencontradocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
