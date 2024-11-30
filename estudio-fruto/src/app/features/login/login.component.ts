import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  fazerLogin(): void {
    // Simulação de validação
    if (this.email === 'admin@estudio.com' && this.senha === '123456') {
      alert('Login realizado com sucesso!');
      this.router.navigate(['/alunos']);
    } else {
      alert('E-mail ou senha incorretos.');
    }
  }
}
