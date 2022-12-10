import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { CadastroServicoComponent } from './components/servicos/cadastro-servico/cadastro-servico.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ProfissionalComponent } from './components/profissional/profissional.component';
import { CadastroProfissionalComponent } from './components/profissional/cadastro-profissional/cadastro-profissional.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CadastroClienteComponent } from './components/clientes/cadastro-cliente/cadastro-cliente.component';

import { ServicoService } from './services/Servico.service';
import { ProfissionalService } from './services/Profissional.service';
import { ClienteService } from './services/Cliente.service';
import { LoginService } from './services/Login.service';
import { LoginComponent } from './components/login/login.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profissional',
        component: ProfissionalComponent
      },
      {
        path: 'cadastro-profissional/:id',
        component: CadastroProfissionalComponent
      },
      {
        path: 'cadastro-profissional',
        component: CadastroProfissionalComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'cadastro-cliente',
        component: CadastroClienteComponent
      },
      {
        path: 'cadastro-cliente/:id',
        component: CadastroClienteComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cadastrar',
        component: CriarContaComponent
      },
      {
        path: 'sobre',
        component: SobreComponent
      },
      {
        path: 'servicos',
        component: ServicosComponent
      },
      {
        path: 'cadastro-servico',
        component: CadastroServicoComponent
      },
      {
        path: 'cadastro-servico/:id',
        component: CadastroServicoComponent
      },
    ]),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ProfissionalComponent,
    CadastroProfissionalComponent,
    ClientesComponent,
    CadastroClienteComponent,
    HomeComponent,
    LoginComponent,
    CriarContaComponent,
    NavbarComponent,
    SobreComponent,
    ServicosComponent,
    CadastroServicoComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    ClienteService,
    ProfissionalService,
    ServicoService,
    LoginService,
  ],
})
export class AppModule {}
