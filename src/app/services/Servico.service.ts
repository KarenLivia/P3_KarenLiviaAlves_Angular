import { Injectable } from '@angular/core';
import { Servico } from '../models/servico';

@Injectable()
export class ServicoService {

  //Tabela Servico
  private servicoLista: Servico[] = [
    {Id: 1, Nome: 'Cabelo', Duracao: '00:30', Valor: 50},
    {Id: 2, Nome: 'Barba', Duracao: '00:30', Valor: 50},
    {Id: 3, Nome: 'Cabelo + Barba', Duracao: '00:50', Valor: 90},
  ];

  constructor() {}

  //Retorna todos os serviços
  public getAllServico(): Servico[]{
    return this.servicoLista;
  }

  //Retorna o serviço pelo id
  public getServicoById(id: number): Servico {
    return this.servicoLista.find(x => x.Id == id);
  }

  //Cria um Id pro serviço e insere o serviço no "banco de dados"
  public setServico(newServico: Servico): Servico {
    //Verifica se existe item na lista
    if(this.servicoLista.length > 0){
      //Se houver, cria igual id do ultimo item + 1
      newServico.Id = this.servicoLista[this.servicoLista.length - 1].Id + 1;
    } else {
      //Se não houver, cria com id 1
      newServico.Id = 1;
    }
    this.servicoLista.push(newServico);
    return newServico;
  }

  //Edita o serviço
  public putServico(servico: Servico): any{
    if(servico == null || servico == undefined)
      return null;
  
    //Procura qual o id do serviço na array
    const index = this.servicoLista.findIndex(x => x.Id == servico.Id);
    if (index !== -1) {
      this.servicoLista[index] = servico;
      return this.servicoLista[index];
    }
    //Se não achar, retorna nulo
    return null;
  }

  //Deleta o serviço pelo id
  public deleteServico(id: number): any {
    //Procura o serviço pelo id fornecido
    let servico = this.servicoLista.find(x => x.Id == id);
    //Se não encontrar, retorna nulo
    if(servico == null || servico == undefined)
      return null;
      
    //Procura qual o id do serviço na array
    let index = this.servicoLista.findIndex(x => x.Id == servico.Id);
    if (index !== -1) {
      this.servicoLista.splice(index, 1);
    }

    return servico;
  }
}
