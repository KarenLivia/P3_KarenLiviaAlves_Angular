import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/Login.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  usuario: Login;
  usuarioExistente: boolean = null;

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginService.deslogar();
    this.validacao();
  }

  criar(){
    if(this.registerForm.valid){
      this.usuario = {...this.usuario, ...this.registerForm.value};
      
      if(this.loginService.getUsuarioByUsuario(this.usuario.Nome)){
        this.usuarioExistente = true;
        return;
      }

      this.criarConta(this.usuario);
      
      this.router.navigate(
        ['/home']
      );
    }
  }

  criarConta(usuario: Login){
    console.log(this.loginService.setUsuario(usuario));
  }

  validacao(){
    this.registerForm = this.fb.group({
      Id: [],
      Nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      Usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      Senha: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }
}