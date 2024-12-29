import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { CadastrarInstrutorComponent } from './features/cadastrar-instrutor/cadastrar-instrutor.component'; 
import { AlunosComponent } from './features/alunos/alunos.component';
import { AgendaComponent } from './features/agenda/agenda.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'cadastrar-instrutor', component: CadastrarInstrutorComponent},
  { path: 'agenda', component: AgendaComponent},
  { path: 'alunos', component: AlunosComponent }
];
