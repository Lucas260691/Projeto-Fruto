import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda',
  standalone: true,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  imports: [CommonModule,FormsModule] 
})
export class AgendaComponent implements OnInit {
  diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
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

  salas: any = {};

  agenda: any = {};

  ngOnInit(): void {
    this.inicializarAgenda();
    this.inicializarSalas();
  }

  inicializarAgenda(): void {
    this.horarios.forEach((horario) => {
      this.agenda[horario] = {};
      this.diasDaSemana.forEach((dia) => {
        this.agenda[horario][dia] = {
          alunos: [],
          instrutor: null
        };
      });
    });
  }

  inicializarSalas(): void {
    this.diasDaSemana.forEach((dia) => {
      this.salas[dia] = { nome: '', cor: null }; // Sala dinâmica e cor
    });
  }

  getCorInstrutor(instrutor: string | null): string {
    const instrutorEncontrado = this.instrutores.find(i => i.nome === instrutor);
    return instrutorEncontrado ? instrutorEncontrado.cor : '#f0f0f0';
  }

  selecionarCor(dia: string): void {
    const instrutorSelecionado = prompt(
      'Digite o nome do instrutor para escolher a cor:\n' +
      this.instrutores.map(i => `${i.nome} (${i.cor})`).join('\n')
    );

    const instrutor = this.instrutores.find(i => i.nome === instrutorSelecionado);
    if (instrutor) {
      this.salas[dia].cor = instrutor.cor;
    } else {
      alert('Instrutor não encontrado!');
    }
  }
}
