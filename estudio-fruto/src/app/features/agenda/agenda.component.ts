import { Component, OnInit } from '@angular/core';
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
export class AgendaComponent implements OnInit {
  constructor(private router: Router) {}

  irParaCadastroAluno(): void {
    this.router.navigate(['/alunos']); // Redireciona para a página de cadastro de aluno
  }

  salvarAgenda(): void {
    console.log('Dados da agenda:', this.agenda);
    // Aqui você pode integrar com o backend ou salvar os dados localmente
    alert('Agenda salva com sucesso!');
  }

  diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  diasSemana: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  diasDoMes: number[] = [];
  listaSalas: string[] = ['Reformer', 'Cadillac', 'Chair', 'Mat', 'Barrel'];
  horarios: string[] = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00',
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

  ngOnInit(): void {
    this.mesAtual = this.meses[this.diaAtual.getMonth()];
    this.atualizarDiasDoMes();
    this.inicializarAgenda();
    this.inicializarSalas();
  }

  mudarDia(delta: number): void {
    const novaData = new Date(this.diaAtual);
    novaData.setDate(this.diaAtual.getDate() + delta);
    this.diaAtual = novaData;
    console.log(`Novo dia: ${this.diaAtual.toLocaleDateString()}`);
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
    console.log(`Dia selecionado: ${this.diaAtual.toLocaleDateString()}`);
  }

  inicializarAgenda(): void {
    this.horarios.forEach((horario) => {
      if (!this.agenda[horario]) {
        this.agenda[horario] = {};
      }
      this.diasDaSemana.forEach((dia) => {
        if (!this.agenda[horario][dia]) {
          this.agenda[horario][dia] = { alunos: [], instrutor: null };
        }
      });
    });
  }

  inicializarSalas(): void {
    this.diasDaSemana.forEach((dia) => {
      if (!this.salas[dia]) {
        this.salas[dia] = { nome: '', cor: null }; // Inicializa com nome vazio e cor nula
      }
    });
  }
  

  carregarAgenda(): void {
    console.log(`Carregando agenda para ${this.diaAtual.toLocaleDateString()}`);
  }

  getCorInstrutor(instrutor: string | null | undefined): string {
    if (!instrutor) {
      return '#f0f0f0'; // Cor padrão caso o instrutor não esteja definido
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

    this.agenda[horario][dia].alunos.push(''); // Adiciona um novo aluno
  }
  

  atualizarAluno(horario: string, dia: string, index: number, novoNome: string): void {
    if (this.agenda[horario]?.[dia]?.alunos && index >= 0) {
      this.agenda[horario][dia].alunos[index] = novoNome.trim(); // Remove espaços desnecessários
    }
  }

  onDrop(event: CdkDragDrop<string[], any, any>, horario: string, dia: string): void {
    // Garante que os dados dos containers não sejam undefined
    const previousData = event.previousContainer.data || [];
    const currentData = event.container.data || [];
  
    if (event.previousContainer === event.container) {
      moveItemInArray(currentData, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(previousData, currentData, event.previousIndex, event.currentIndex);
    }
  
    // Atualiza a agenda para garantir a consistência
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
