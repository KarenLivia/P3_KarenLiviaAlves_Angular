import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from '../../../models/servico';
import { LoginService } from '../../../services/Login.service';
import { ServicoService } from '../../../services/Servico.service';

@Component({
  selector: 'app-cadastro-servico',
  templateUrl: './cadastro-servico.component.html',
  styleUrls: ['./cadastro-servico.component.css'],
})
export class CadastroServicoComponent implements OnInit {

  servico = new Servico();
  routeId: any;

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private servicoService: ServicoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {  }

  ngOnInit() {
    this.verificarUsuario();
    this.validacao();
    
    //Tenta pegar o id passado pela rota, e se existir e for maior que 0, busca o servico pela service
    this.routeId =  this.activatedRoute.snapshot.paramMap.get("id");
    if(this.routeId && this.routeId > 0){
      this.carregarServico(this.routeId);
    }
  }

  verificarUsuario(){
    let usuario = this.loginService.getUsuarioLogado();

    if(!usuario || usuario == undefined){
      this.router.navigate(
        ['/login']
      );
    }
  }

  //Limpa todos os campos menos o Id (pra evitar criar um novo serviço após limpar campos de um ja existente)
  limparForm(){
    this.registerForm.controls['Nome'].reset();
    this.registerForm.controls['Duracao'].reset();
    this.registerForm.controls['Valor'].reset();
  }

  cadastrar() {
    //Se o form estiver com dados válidos, prossegue
    if(this.registerForm.valid){
      //Preenche o servico com os dados do form
      this.servico = {...this.servico, ...this.registerForm.value};
      //Se o serviço tiver um id, significa que é um edit, se não tiver, é um create
      this.servico.Id ? this.editarServico(this.servico) : this.criarServico(this.servico);

      //Manda de volta pra tela de listagem dos serviços
      this.router.navigate(
        ['/servicos']
      );
    }
  }

  criarServico(servico: Servico) {
    console.log(this.servicoService.setServico(servico));
  }

  editarServico(servico: Servico){
    console.log(this.servicoService.putServico(servico));
  }

  //Busca serviço na service pelo Id, e então preenche o form com os dados dele
  carregarServico(id: number){
    this.servico = this.servicoService.getServicoById(id);
    this.registerForm.patchValue(this.servico);
  }

  //Cria o form
  validacao(){
    this.registerForm = this.fb.group({
      Id: [],
      Nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      Duracao: ['', Validators.required],
      Valor: ['', [Validators.required, Validators.min(10)]]
    });
  }
}
