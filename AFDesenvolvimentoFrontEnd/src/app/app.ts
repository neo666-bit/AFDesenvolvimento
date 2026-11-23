import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ResumoSaldo } from './components/resumo-saldo/resumo-saldo';
import { TransacaoForm } from './components/transacao-form/transacao-form';
import { TransacaoLista } from './components/transacao-lista/transacao-lista'; 
import { TransacaoService } from './services/transacao';
import { Transacao } from './models/transacao';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResumoSaldo, TransacaoForm, TransacaoLista], 
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private service = inject(TransacaoService);
  private cdr = inject(ChangeDetectorRef);

  transacoes: Transacao[] = [];
  transacaoSelecionada: Transacao | null = null; 

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.transacaoSelecionada = null;
    this.service.listar().subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar transações:', err)
    });
  }

  selecionarParaEdicao(transacao: Transacao): void {
    this.transacaoSelecionada = { ...transacao };
  }
}