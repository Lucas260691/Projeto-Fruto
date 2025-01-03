import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-alunos',
  standalone: true,
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
  imports: [CommonModule, FormsModule,DragDropModule],
})
export class AlunosComponent {
  aluno = {
    nome: '',
    email: '',
    contato: '',
    codAlune: '',
    tipoPlano: '',
    frequenciaSemanal: '',
    diasFixos: '',
  };

  salvarAluno(): void {
    console.log('Aluno salvo:', this.aluno);
    alert('Aluno cadastrado com sucesso!');
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.aluno = {
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
