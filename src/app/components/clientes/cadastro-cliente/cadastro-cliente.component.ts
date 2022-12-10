import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/Cliente.service';
import { LoginService } from '../../../services/Login.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  cliente = new Cliente();
  routeId: any;

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {  }

  ngOnInit() {
    this.verificarUsuario();
    this.validacao();
    
    //Tenta pegar o id passado pela rota, e se existir e for maior que 0, busca o Cliente pela service
    this.routeId =  this.activatedRoute.snapshot.paramMap.get("id");
    if(this.routeId && this.routeId > 0){
      this.carregarCliente(this.routeId);
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

  //Limpa todos os campos menos o Id (pra evitar criar um novo Cliente após limpar campos de um ja existente)
  limparForm(){
    this.registerForm.controls['Nome'].reset();
    this.registerForm.controls['Telefone'].reset();
    this.registerForm.controls['Cpf'].reset();
  }

  cadastrar() {
    //Se o form estiver com dados válidos, prossegue
    if(this.registerForm.valid){
      //Preenche o Cliente com os dados do form
      this.cliente = {...this.cliente, ...this.registerForm.value};
      //Se o Cliente tiver um id, significa que é um edit, se não tiver, é um create
      this.cliente.Id ? this.editarCliente(this.cliente) : this.criarCliente(this.cliente);

      //Manda de volta pra tela de listagem dos Clientes
      this.router.navigate(
        ['/clientes']
      );
    }
  }

  criarCliente(cliente: Cliente) {
    console.log(this.clienteService.setCliente(cliente));
  }

  editarCliente(cliente: Cliente){
    console.log(this.clienteService.putCliente(cliente));
  }

  //Busca Cliente na service pelo Id, e então preenche o form com os dados dele
  carregarCliente(id: number){
    this.cliente = this.clienteService.getClienteById(id);
    this.registerForm.patchValue(this.cliente);
  }

  //Cria o form
  validacao(){
    this.registerForm = this.fb.group({
      Id: [],
      Nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      Telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13)]],
      Cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }
}