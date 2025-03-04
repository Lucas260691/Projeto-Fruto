import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cadastrar-instrutor',
  standalone: true,
  templateUrl: './cadastrar-instrutor.component.html',
  styleUrl: './cadastrar-instrutor.component.scss',
  imports: [FormsModule, CommonModule, DragDropModule,HttpClientModule]
})
export class CadastrarInstrutorComponent {

  instrutor = {
    nome: '',
    email: '',
    contato: ''
  };

  constructor(private http: HttpClient) {}

  async cadastrarInstrutor(): Promise<void> {
    try {
      const response = await this.http
        .post('/api/instrutores/cadastrar', this.instrutor)
        .toPromise();
      alert('Instrutor cadastrado com sucesso!');
      console.log(response);
      this.instrutor = { nome: '', email: '', contato: ''};
    } catch (error) {
      console.error('Erro ao cadastrar instrutor:', error);
      alert(`Erro ao cadastrar instrutor: ${(error as any).message}`);
    }
  }

}
