import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gerencia } from './gerencia';

describe('Gerencia', () => {
  let component: Gerencia;
  let fixture: ComponentFixture<Gerencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gerencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gerencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});