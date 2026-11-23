import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../models/transacao';
import { TransacaoService } from '../../services/transacao';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-transacao-lista',
  standalone: true,
  styleUrl: './transacao-lista.css',
  templateUrl: './transacao-lista.html',
})
export class TransacaoLista {
  private service = inject(TransacaoService);

  @Input() transacoes: Transacao[] = [];
  @Output() excluiu = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Transacao>();

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

  excluir(id?: string) {
    if (!id) return;
    this.service.excluir(id).subscribe(() => {
      this.excluiu.emit();
    });
  }

  get listaFiltrada(): Transacao[] {
    return this.filtro
      ? this.transacoes.filter(t => t.categoria === this.filtro)
      : this.transacoes;
  }


  corCategoria(categoria: string): string {
    const cores: Record<string, string> = {
      'Salário': '#2e7d32',      
      'Alimentação': '#ef6c00',  
      'Transporte': '#1565c0',  
      'Moradia': '#6a1b9a',     
      'Lazer': '#ad1457',    
      'Saúde': '#00838f',      
      'Outros': '#546e7a' 
    };
    return cores[categoria] || '#546e7a';
  }
}