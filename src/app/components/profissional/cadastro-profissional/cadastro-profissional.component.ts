import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profissional } from '../../../models/profissional';
import { LoginService } from '../../../services/Login.service';
import { ProfissionalService } from '../../../services/Profissional.service';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.component.html',
  styleUrls: ['./cadastro-profissional.component.css']
})
export class CadastroProfissionalComponent implements OnInit {

  profissional = new Profissional();
  routeId: any;

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private profissionalService: ProfissionalService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {  }

  ngOnInit() {
    this.verificarUsuario();
    this.validacao();
    
    //Tenta pegar o id passado pela rota, e se existir e for maior que 0, busca o Profissional pela service
    this.routeId =  this.activatedRoute.snapshot.paramMap.get("id");
    if(this.routeId && this.routeId > 0){
      this.carregarProfissional(this.routeId);
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

  //Limpa todos os campos menos o Id (pra evitar criar um novo profissional após limpar campos de um ja existente)
  limparForm(){
    this.registerForm.controls['Nome'].reset();
    this.registerForm.controls['Funcao'].reset();
    this.registerForm.controls['Cpf'].reset();
  }

  cadastrar() {
    //Se o form estiver com dados válidos, prossegue
    if(this.registerForm.valid){
      //Preenche o Profissional com os dados do form
      this.profissional = {...this.profissional, ...this.registerForm.value};
      //Se o profissional tiver um id, significa que é um edit, se não tiver, é um create
      this.profissional.Id ? this.editarProfissional(this.profissional) : this.criarProfissional(this.profissional);

      //Manda de volta pra tela de listagem dos profissionals
      this.router.navigate(
        ['/profissional']
      );
    }
  }

  criarProfissional(profissional: Profissional) {
    console.log(this.profissionalService.setProfissional(profissional));
  }

  editarProfissional(profissional: Profissional){
    console.log(this.profissionalService.putProfissional(profissional));
  }

  //Busca profissional na service pelo Id, e então preenche o form com os dados dele
  carregarProfissional(id: number){
    this.profissional = this.profissionalService.getProfissionalById(id);
    this.registerForm.patchValue(this.profissional);
  }

  //Cria o form
  validacao(){
    this.registerForm = this.fb.group({
      Id: [],
      Nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      Funcao: ['', Validators.required],
      Cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }
}