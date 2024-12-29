// agenda.component.ts
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-agenda',
  standalone: true,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  imports: [CommonModule, FormsModule, DragDropModule]
})
export class AgendaComponent implements OnInit, AfterViewChecked {
  
  isEditing: boolean = false; // Estado de edição da agenda
  alunoFocus: { horario: string; dia: string; index: number } | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mesAtual = this.meses[this.diaAtual.getMonth()];
    this.atualizarDiasDoMes();
    //this.inicializarAgenda();
    this.inicializarSalas();

    this.turmas.forEach((turma) => {
      turma.agenda = {};
      this.inicializarAgenda(turma.agenda);
    });
  
    // Define a primeira turma como selecionada e carrega sua agenda
    this.selecionarTurma(0);
  }

  ngAfterViewChecked(): void {
    if (this.alunoFocus) {
      const { horario, dia, index } = this.alunoFocus;
      const element = document.querySelector(
        `input[data-horario="${horario}"][data-dia="${dia}"][data-index="${index}"]`
      ) as HTMLInputElement;
      if (element && document.activeElement !== element) {
        element.focus();
      }
    }
  }

  irParaCadastroAluno(): void {
    this.router.navigate(['/alunos']);
  }

  salvarAgenda(): void {
    this.turmas[this.turmaSelecionada].agenda = { ...this.agenda };
    alert(`Agenda da ${this.turmas[this.turmaSelecionada].nome} salva com sucesso!`);
  }

  editarAgenda(): void {
    this.isEditing = !this.isEditing; // Alterna entre os modos de edição e visualização
    if (this.isEditing) {
      console.log('Modo de edição ativado.');
    } else {
      console.log('Modo de edição desativado.');
      this.salvarAgenda(); // Salva os dados ao sair do modo de edição
    }
  }

  diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  diasSemana: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  diasDoMes: number[] = [];
  listaSalas: string[] = ['Reformer', 'Cadillac', 'Chair', 'Mat', 'Barrel'];
  horarios: string[] = [
    '07:00 - 08:00','08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
    '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00',
    '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00',
    '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00',
    '20:00 - 21:00', '21:00 - 22:00'
  ];

  instrutores = [
    { nome: 'Mari', cor: '#007bff' },
    { nome: 'João', cor: '#28a745' },
    { nome: 'Ana', cor: '#ffc107' },
    { nome: 'Carlos', cor: '#dc3545' }
  ];

  salas: Record<string, { nome: string; cor: string | null }> = {};
  agenda: Record<string, Record<string, { alunos: string[]; instrutor: string | null }>> = {};
  diaAtual: Date = new Date();
  anoAtual: number = this.diaAtual.getFullYear();
  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  mesAtual: string = '';

turmas: { nome: string; agenda: Record<string, Record<string, { alunos: string[]; instrutor: string | null }>> }[] = 
[
  { nome: 'Turma 1', agenda: {} },
  { nome: 'Turma 2', agenda: {} },
  { nome: 'Turma 3', agenda: {} },
  { nome: 'Turma 4', agenda: {} },
  { nome: 'Turma 5', agenda: {} },
];

turmaSelecionada: number = 0; // Índice da turma ativa


 selecionarTurma(indice: number): void {
   this.turmaSelecionada = indice;
   this.agenda = this.turmas[indice].agenda;
 }


  mudarDia(delta: number): void {
    const novaData = new Date(this.diaAtual);
    novaData.setDate(this.diaAtual.getDate() + delta);
    this.diaAtual = novaData;
  }

  mudarMes(delta: number): void {
    const novaData = new Date(this.diaAtual);
    novaData.setMonth(this.diaAtual.getMonth() + delta);
    this.diaAtual = novaData;
    this.mesAtual = this.meses[this.diaAtual.getMonth()];
    this.anoAtual = this.diaAtual.getFullYear();
    this.atualizarDiasDoMes();
  }

  atualizarDiasDoMes(): void {
    const primeiroDia = new Date(this.anoAtual, this.diaAtual.getMonth(), 1);
    const ultimoDia = new Date(this.anoAtual, this.diaAtual.getMonth() + 1, 0);
    this.diasDoMes = Array.from({ length: ultimoDia.getDate() }, (_, i) => i + 1);
  }

  selecionarDia(dia: number): void {
    const novaData = new Date(this.diaAtual);
    novaData.setDate(dia);
    this.diaAtual = novaData;
  }

  inicializarAgenda(agendaDestino?: Record<string, Record<string, { alunos: string[]; instrutor: string | null }>>): void {
    const agenda = agendaDestino || this.agenda; // Use a agenda passada ou a agenda geral
    this.horarios.forEach((horario) => {
      if (!agenda[horario]) {
        agenda[horario] = {};
      }
      this.diasDaSemana.forEach((dia) => {
        if (!agenda[horario][dia]) {
          agenda[horario][dia] = { alunos: [], instrutor: null };
        }
      });
    });
  }
  




  //inicializarAgenda(): void {
   // this.horarios.forEach((horario) => {
      //if (!this.agenda[horario]) {
        //this.agenda[horario] = {};
      //}
      //this.diasDaSemana.forEach((dia) => {
        //if (!this.agenda[horario][dia]) {
          //this.agenda[horario][dia] = { alunos: [], instrutor: null };
        //}
      //});
    //});
  //}

  inicializarSalas(): void {
    this.diasDaSemana.forEach((dia) => {
      if (!this.salas[dia]) {
        this.salas[dia] = { nome: '', cor: null };
      }
    });
  }

  carregarAgenda(): void {
    console.log(`Carregando agenda para ${this.diaAtual.toLocaleDateString()}`);
  }

  getCorInstrutor(instrutor: string | null | undefined): string {
    if (!instrutor) {
      return '#f0f0f0';
    }
    const instrutorEncontrado = this.instrutores.find(i => i.nome === instrutor);
    return instrutorEncontrado ? instrutorEncontrado.cor : '#f0f0f0';
  }

  selecionarCor(dia: string): void {
    const instrutorSelecionado: string | null = prompt(
      'Digite o nome do instrutor para escolher a cor:\n' +
      this.instrutores.map(i => `${i.nome} (${i.cor})`).join('\n')
    );

    if (instrutorSelecionado === null || instrutorSelecionado.trim() === '') {
      alert('Nenhum instrutor foi selecionado.');
      return;
    }

    const instrutor = this.instrutores.find(i => i.nome === instrutorSelecionado);
    if (instrutor) {
      this.salas[dia].cor = instrutor.cor;
    } else {
      alert('Instrutor não encontrado!');
    }
  }

  rodizioSalas(): void {
    this.diasDaSemana.forEach((dia, index) => {
      const salaIndex = index % this.listaSalas.length;
      this.salas[dia].nome = this.listaSalas[salaIndex];
    });
  }

  trackByHorario(index: number, horario: string): string {
    return horario;
  }

  trackByDia(index: number, dia: string): string {
    return dia;
  }

  trackByIndex(index: number): number {
    return index;
  }

  adicionarAluno(horario: string, dia: string): void {
    if (!this.agenda[horario]) {
      this.agenda[horario] = {};
    }
    if (!this.agenda[horario][dia]) {
      this.agenda[horario][dia] = { alunos: [], instrutor: null };
    }
    if (this.agenda[horario][dia].alunos.length >= 4) {
      alert('A capacidade máxima de 4 alunos por célula foi atingida.');
      return;
    }

    this.agenda[horario][dia].alunos.push('');
  }

  atualizarAlunoComEvento(horario: string, dia: string, index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const novoNome = inputElement.value.trim();
    this.agenda[horario][dia].alunos[index] = novoNome;
  }

  onDrop(event: CdkDragDrop<string[], any, any>, horario: string, dia: string): void {
    const previousData = event.previousContainer.data || [];
    const currentData = event.container.data || [];

    if (event.previousContainer === event.container) {
      moveItemInArray(currentData, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(previousData, currentData, event.previousIndex, event.currentIndex);
    }

    if (!this.agenda[horario]) {
      this.agenda[horario] = {};
    }
    if (!this.agenda[horario][dia]) {
      this.agenda[horario][dia] = { alunos: currentData, instrutor: null };
    } else {
      this.agenda[horario][dia].alunos = currentData;
    }
  }
}