export interface Transacao {
  _id?: string;                     
  descricao: string;                
  valor: number;                    
  tipo: 'receita' | 'despesa';      
  categoria: string;                
  data: string;                     

}
