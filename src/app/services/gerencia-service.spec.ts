import { TestBed } from '@angular/core/testing';

import { GerenciaService } from './gerencia-service';

describe('GerenciaService', () => {
  let service: GerenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
