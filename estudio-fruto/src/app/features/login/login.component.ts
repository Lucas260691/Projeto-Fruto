import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule,HttpClientModule],
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  fazerLogin(): void {
    // Simulação de validação
    const loginData = { email: this.email, senha: this.senha };

    this.http.post('/api/instrutores/login', loginData).subscribe(
      (response: any) => {
        alert('Login realizado com sucesso!');
        localStorage.setItem('instrutor', JSON.stringify(response));
        this.router.navigate(['/agenda']);
      },
      (error) => {
        alert(error.error || 'Erro ao realizar login. Verifique as credenciais.');
      }
    );
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastrar-instrutor']);
  }
}
