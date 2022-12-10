import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/Login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = new Login();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificarUsuario();
  }

  verificarUsuario(){
    this.usuario = this.loginService.getUsuarioLogado();

    if(!this.usuario || this.usuario == undefined){
      this.router.navigate(
        ['/login']
      );
    }
  }
    
}
