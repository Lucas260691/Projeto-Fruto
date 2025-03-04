import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'app-alunos',
  standalone: true,
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class AlunosComponent {
  aluno: Aluno = this.inicializarAluno();

  salvarAluno(): void {
    console.log('Aluno salvo:', this.aluno);
    alert('Aluno cadastrado com sucesso!');
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.aluno = this.inicializarAluno();
  }

  private inicializarAluno(): Aluno {
    return {
      nome: '',
      email: '',
      contato: '',
      codAlune: '',
      tipoPlano: '',
      frequenciaSemanal: '',
      diasFixos: '',
    };
  }
}
  