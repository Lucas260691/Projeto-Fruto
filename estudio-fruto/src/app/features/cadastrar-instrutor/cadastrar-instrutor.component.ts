import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InstrutoresService } from '../../services/instrutores.service';
import { Instrutor } from '../../models/instrutor.model';

@Component({
  selector: 'app-cadastrar-instrutor',
  standalone: true,
  templateUrl: './cadastrar-instrutor.component.html',
  styleUrls: ['./cadastrar-instrutor.component.scss'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class CadastrarInstrutorComponent {
  instrutor: Instrutor = this.inicializarInstrutor();

  constructor(private instrutoresService: InstrutoresService) {}

  private inicializarInstrutor(): Instrutor {
    return {
      nome: '',
      email: '',
      contato: ''
    };
  }

  cadastrarInstrutor(): void {
    this.instrutoresService.cadastrarInstrutor(this.instrutor).subscribe({
      next: (res) => {
        alert('Instrutor cadastrado com sucesso!');
        console.log(res);
        this.instrutor = this.inicializarInstrutor();
      },
      error: (err) => {
        console.error('Erro ao cadastrar instrutor:', err);
        alert(`Erro ao cadastrar instrutor: ${err.error?.message || 'Erro desconhecido'}`);
      }
    });
  }
}
