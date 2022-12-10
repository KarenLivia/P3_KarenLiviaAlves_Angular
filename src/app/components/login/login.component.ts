import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/Login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Login;
  loginValido: boolean = null;

  registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginService.deslogar();
    this.validacao();
  }

  logar(){
    if(this.registerForm.valid){
      this.usuario = {...this.usuario, ...this.registerForm.value};
      this.verificarLogin(this.usuario);
    }
  }

  verificarLogin(usuario: Login){
    if(this.loginService.logar(usuario)){
      this.router.navigate(
        ['/home']
      );
    }
    this.loginValido = false;
  }

  validacao(){
    this.registerForm = this.fb.group({
      Id: [],
      Nome: [''],
      Usuario: ['', Validators.required],
      Senha: ['', Validators.required]
    });
  }
}