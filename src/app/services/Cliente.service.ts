import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService {

  //Tabela Cliente
  private clienteLista: Cliente[] = [
    {Id: 1, Nome: 'Joílson Mendes', Telefone: '013992012044', Cpf: '12345678945'},
    {Id: 2, Nome: 'Takamassa Nomuro', Telefone: '01334591574', Cpf: '98765432100'},
    {Id: 3, Nome: 'Harry Potter', Telefone: '01334591574', Cpf: '14725806955'},
  ];

  constructor() {}
  //Retorna todos os clientes
  public getAllCliente(): Cliente[]{
    return this.clienteLista;
  }

  //Retorna o cliente pelo id
  public getClienteById(id: number): Cliente {
    return this.clienteLista.find(x => x.Id == id);
  }

  //Cria um Id pro cliente e insere o cliente no "banco de dados"
  public setCliente(newCliente: Cliente): Cliente {
    //Verifica se existe item na lista
    if(this.clienteLista.length > 0){
      //Se houver, cria igual id do ultimo item + 1
      newCliente.Id = this.clienteLista[this.clienteLista.length - 1].Id + 1;
    } else {
      //Se não houver, cria com id 1
      newCliente.Id = 1;
    }
    this.clienteLista.push(newCliente);
    return newCliente;
  }

  //Edita o cliente
  public putCliente(Cliente: Cliente): any{
    if(Cliente == null || Cliente == undefined)
      return null;
  
    //Procura qual o id do cliente na array
    const index = this.clienteLista.findIndex(x => x.Id == Cliente.Id);
    if (index !== -1) {
      this.clienteLista[index] = Cliente;
      return this.clienteLista[index];
    }
    //Se não achar, retorna nulo
    return null;
  }

  //Deleta o cliente pelo id
  public deleteCliente(id: number): any {
    //Procura o cliente pelo id fornecido
    let Cliente = this.clienteLista.find(x => x.Id == id);

    if(Cliente == null || Cliente == undefined)
      //Se não encontrar, retorna nulo
      return null;

    //Procura qual o id do cliente na array
    const index = this.clienteLista.indexOf(Cliente);
    if (index !== -1) {
      this.clienteLista.splice(index, 1);
      console.log(this.clienteLista);
    }

    return Cliente;
  }
}