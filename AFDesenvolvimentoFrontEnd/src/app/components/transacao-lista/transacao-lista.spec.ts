import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransacaoLista } from './transacao-lista';

describe('TransacaoLista', () => {
  let component: TransacaoLista;
  let fixture: ComponentFixture<TransacaoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(TransacaoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
