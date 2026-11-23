import { Component, OnInit, inject } from '@angular/core';
import { Transacao } from '../../models/transacao';
import { TransacaoService } from '../../services/transacao';

@Component({
  imports: [],
  selector: 'app-transacao-lista',
  styleUrl: './transacao-lista.css',
  templateUrl: './transacao-lista.html',
})
export class TransacaoLista implements OnInit {
  private service = inject(TransacaoService);

  transacoes: Transacao[] = [];
  filtro = '';

  categorias: string[] = [
    'Salário',
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Saúde',
    'Outros'
  ];

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe(dados => {
      this.transacoes = dados;
    });
  }

  excluir(id: string) {
    this.service.excluir(id).subscribe(() => {
      this.carregar();
    });
  }

  get listaFiltrada(): Transacao[] {
    return this.filtro
      ? this.transacoes.filter(t => t.categoria === this.filtro)
      : this.transacoes;
  }
}