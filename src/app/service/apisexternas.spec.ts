import { TestBed } from '@angular/core/testing';
import { Apisexternas } from './apisexternas';

describe('Apisexternas', () => {
  let service: Apisexternas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apisexternas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
