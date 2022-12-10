import { Injectable } from '@angular/core';
import { Profissional } from '../models/profissional';

@Injectable()
export class ProfissionalService {

  //Tabela Profissional
  private profissionalLista: Profissional[] = [
    {Id: 1, Nome: 'Karen Livia', Funcao: 'Barbeiro', Cpf: '91575631587'},
    {Id: 2, Nome: 'Camila Cabelo', Funcao: 'Manicure', Cpf: '68765684100'},
    {Id: 3, Nome: 'Fabrício Guimarães', Funcao: 'Barbeiro', Cpf: '14725860695'},
  ];

  constructor() {}
  //Retorna todos os serviços
  public getAllProfissional(): Profissional[]{
    return this.profissionalLista;
  }

  //Retorna o serviço pelo id
  public getProfissionalById(id: number): Profissional {
    return this.profissionalLista.find(x => x.Id == id);
  }

  //Cria um Id pro serviço e insere o serviço no "banco de dados"
  public setProfissional(newProfissional: Profissional): Profissional {
    //Verifica se existe item na lista
    if(this.profissionalLista.length > 0){
      //Se houver, cria igual id do ultimo item + 1
      newProfissional.Id = this.profissionalLista[this.profissionalLista.length - 1].Id + 1;
    } else {
      //Se não houver, cria com id 1
      newProfissional.Id = 1;
    }
    this.profissionalLista.push(newProfissional);
    return newProfissional;
  }

  //Edita o serviço
  public putProfissional(profissional: Profissional): any{
    if(profissional == null || profissional == undefined)
      return null;
  
    //Procura qual o id do serviço na array
    const index = this.profissionalLista.findIndex(x => x.Id == profissional.Id);
    if (index !== -1) {
      this.profissionalLista[index] = profissional;
      return this.profissionalLista[index];
    }
    //Se não achar, retorna nulo
    return null;
  }

  //Deleta o serviço pelo id
  public deleteProfissional(id: number): any {
    //Procura o serviço pelo id fornecido
    let profissional = this.profissionalLista.find(x => x.Id == id);

    if(profissional == null || profissional == undefined)
      //Se não encontrar, retorna nulo
      return null;

    //Procura qual o id do serviço na array
    const index = this.profissionalLista.indexOf(profissional);
    if (index !== -1) {
      this.profissionalLista.splice(index, 1);
      console.log(this.profissionalLista);
    }

    return profissional;
  }
}