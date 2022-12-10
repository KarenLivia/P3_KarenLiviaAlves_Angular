import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../../models/servico';
import { LoginService } from '../../services/Login.service';
import { ServicoService } from '../../services/Servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  listaServicos: Servico[] = []

  constructor(
    private loginService: LoginService,
    private servicoService: ServicoService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.verificarUsuario();
    this.buscarServicos();
  }

  verificarUsuario(){
    let usuario = this.loginService.getUsuarioLogado();

    if(!usuario || usuario == undefined){
      this.router.navigate(
        ['/login']
      );
    }
  }

  buscarServicos(){
    this.listaServicos = this.servicoService.getAllServico();
  }

  editarServico(servico: Servico){
    this.router.navigate(
      ['/cadastro-servico', servico.Id]
    );
  }

  excluirServico(servico: Servico){
    if(!servico.Id || servico.Id == undefined){
      console.log("Erro ao excluir: Serviço inválido.");
      return;
    }

    let retorno = this.servicoService.deleteServico(servico.Id);
    if(!retorno){
      console.log("Erro ao excluir: Serviço não existe.")
    } else {
      console.log(`Serviço excluído: ${servico.Nome}`)
    }

    this.buscarServicos();
  }
}