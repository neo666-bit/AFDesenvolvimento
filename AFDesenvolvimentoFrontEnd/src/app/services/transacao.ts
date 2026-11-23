import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/transacoes';

  listar(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  criar(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }

  atualizar(id: string, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.apiUrl}/${id}`, transacao);
  }

  excluir(id: string): Observable< any > {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}