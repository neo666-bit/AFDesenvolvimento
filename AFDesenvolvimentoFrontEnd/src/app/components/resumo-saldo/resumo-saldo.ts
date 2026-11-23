import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transacao } from '../../models/transacao';

@Component({
  imports: [CommonModule],
  selector: 'app-resumo-saldo',
  styleUrl: './resumo-saldo.css',
  templateUrl: './resumo-saldo.html',
  standalone: true
})
export class ResumoSaldo {
  @Input() transacoes: Transacao[] = [];

  get totalReceitas(): number {
    return this.transacoes
      .filter(transacao => transacao.tipo === 'receita')
      .reduce((total, transacao) => total + transacao.valor, 0);
  }

  get totalDespesas(): number {
    return this.transacoes
      .filter(transacao => transacao.tipo === 'despesa')
      .reduce((total, transacao) => total + transacao.valor, 0);
  }

  get saldo(): number {
    return this.totalReceitas - this.totalDespesas;
  }
}
