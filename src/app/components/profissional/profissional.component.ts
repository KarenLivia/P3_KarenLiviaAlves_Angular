import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profissional } from '../../models/profissional';
import { LoginService } from '../../services/Login.service';
import { ProfissionalService } from '../../services/Profissional.service';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  listaProfissional: Profissional[] = [];

  constructor(
    private loginService: LoginService,
    private profissionalService: ProfissionalService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.verificarUsuario();
    this.buscarProfissinais();
  }

  verificarUsuario(){
    let usuario = this.loginService.getUsuarioLogado();

    if(!usuario || usuario == undefined){
      this.router.navigate(
        ['/login']
      );
    }
  }

  buscarProfissinais(){
    this.listaProfissional = this.profissionalService.getAllProfissional();
  }

  editarProfissional(profissional: Profissional){
    this.router.navigate(
      ['/cadastro-profissional', profissional.Id]
    );
  }

  excluirProfissional(profissional: Profissional){
    if(!profissional.Id || profissional.Id == undefined){
      console.log("Erro ao excluir: Profissional inválido.");
      return;
    }

    let retorno = this.profissionalService.deleteProfissional(profissional.Id);
    if(!retorno){
      console.log("Erro ao excluir: Profissional não existe.")
    } else {
      console.log(`Profissional excluído: ${profissional.Id}`)
    }

    this.buscarProfissinais();
  }

}