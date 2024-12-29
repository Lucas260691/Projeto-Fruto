import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cadastrar-instrutor',
  standalone: true,
  templateUrl: './cadastrar-instrutor.component.html',
  styleUrl: './cadastrar-instrutor.component.scss',
  imports: [FormsModule, CommonModule, DragDropModule]
})
export class CadastrarInstrutorComponent {

  instrutor = {
    nome: '',
    email: '',
    contato: '',
    senha: ''
  };

  constructor(private http: HttpClient) {}

  cadastrarInstrutor(): void {
    this.http.post('/api/instrutores/cadastrar', this.instrutor).subscribe(
      () => {
        alert('Instrutor cadastrado com sucesso!');
        this.instrutor = { nome: '', email: '', contato: '', senha: '' };
      },
      (error) => {
        alert(`Erro ao cadastrar instrutor: ${error.error}`);
      }
    );
  }

}
