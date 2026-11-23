import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumoSaldo } from './resumo-saldo';

describe('ResumoSaldo', () => {
  let component: ResumoSaldo;
  let fixture: ComponentFixture<ResumoSaldo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoSaldo],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumoSaldo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
