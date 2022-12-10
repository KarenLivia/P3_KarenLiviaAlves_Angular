import { Injectable } from '@angular/core';
import { Login } from '../models/login';

@Injectable()
export class LoginService {

  listContas: Login[] = [
    {Id: 1, Nome: "Administrador", Usuario: "admin", Senha: "admin"},
    {Id: 2, Nome: "Karen", Usuario: "Nerak", Senha: "1234"}
  ];
  usuarioLogado: Login;

  constructor() { }

  public getAllUsuario(): Login[]{
    return this.listContas;
  }

  public getUsuarioById(id: number): Login {
    return this.listContas.find(x => x.Id == id);
  }

  public getUsuarioByUsuario(usuario: string): Login {
    return this.listContas.find(x => x.Usuario == usuario);
  }

  public getUsuarioLogado(): any{
    return this.usuarioLogado;
  }

  public logar(usuario: Login): boolean{
    let verificacao: Login;
    verificacao = this.listContas.find(x => x.Usuario == usuario.Usuario);
    if(!verificacao || verificacao == undefined)
      return false;

    if(verificacao.Senha != usuario.Senha)
      return false;

    this.usuarioLogado = verificacao;
    return true;
  }

  public deslogar(){
    this.usuarioLogado = null;
  }

  public setUsuario(newUsuario: Login): Login {
    if(this.listContas.length > 0){
      newUsuario.Id = this.listContas[this.listContas.length - 1].Id + 1;
    } else {
      newUsuario.Id = 1;
    }
    this.listContas.push(newUsuario);
    return newUsuario;
  }

  public putUsuario(Usuario: Login): any{
    if(Usuario == null || Usuario == undefined)
      return null;
  
    const index = this.listContas.findIndex(x => x.Id == Usuario.Id);
    if (index !== -1) {
      this.listContas[index] = Usuario;
      return this.listContas[index];
    }
    return null;
  }

  public deleteUsuario(id: number): any {
    let Usuario = this.listContas.find(x => x.Id == id);

    if(Usuario == null || Usuario == undefined)
      return null;

    const index = this.listContas.indexOf(Usuario);
    if (index !== -1) {
      this.listContas.splice(index, 1);
      console.log(this.listContas);
    }

    return Usuario;
  }
}