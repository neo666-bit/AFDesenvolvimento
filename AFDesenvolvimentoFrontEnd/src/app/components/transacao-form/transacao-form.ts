import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transacao } from '../../models/transacao';
import { TransacaoService } from '../../services/transacao';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacao-form.html',
  styleUrl: './transacao-form.css',
})
export class TransacaoForm implements OnChanges {
  private service = inject(TransacaoService);


  @Input() transacaoEmEdicao: Transacao | null = null;


  @Output() salvo = new EventEmitter<void>();

  categorias: string[] = [
    'Salário',
    'Alimentação',
    'Transporte',
    'Moradia',
    'Lazer',
    'Saúde',
    'Outros'
  ];


  form: Transacao = this.novoFormulario();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transacaoEmEdicao'] && this.transacaoEmEdicao) {
      this.form = { ...this.transacaoEmEdicao };
    }
  }

  novoFormulario(): Transacao {
    return {
      descricao: '',
      valor: 0,
      tipo: 'despesa',
      categoria: 'Alimentação',
      data: new Date().toISOString().substring(0, 10) 
    };
  }

  salvar(): void {
    if (!this.form.descricao || this.form.valor <= 0) {
      alert('Preencha a descrição e um valor maior que zero!');
      return;
    }


    if (this.form._id) {
      this.service.atualizar(this.form._id, this.form).subscribe({
        next: () => {
          this.limpar();
          this.salvo.emit();
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.service.criar(this.form).subscribe({
        next: () => {
          this.limpar();
          this.salvo.emit();
        },
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }

  limpar(): void {
    this.transacaoEmEdicao = null;
    this.form = this.novoFormulario();
  }
}