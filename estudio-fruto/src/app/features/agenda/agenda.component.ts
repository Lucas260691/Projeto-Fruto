import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true, // Torna o componente standalone
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  imports: [CommonModule] // Adicione aqui
})
export class AgendaComponent implements OnInit {
  diasDaSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  horarios: string[] = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00'
  ];;

  instrutores = [
    { nome: 'Instrutora Mari', cor: '#007bff' },
    { nome: 'Instrutor João', cor: '#28a745' },
    { nome: 'Instrutora Ana', cor: '#ffc107' },
    { nome: 'Instrutor Carlos', cor: '#dc3545' }
  ];

  agenda: any = {};

  constructor() {}

  ngOnInit(): void {
    this.inicializarAgenda();
  }

  inicializarAgenda(): void {
    this.horarios.forEach((horario) => {
      this.agenda[horario] = {};
      this.diasDaSemana.forEach((dia) => {
        this.agenda[horario][dia] = null; // Inicializa vazio
      });
    });
  }

  

  getCorInstrutor(instrutor: string | null): string {
    const instrutorEncontrado = this.instrutores.find(i => i.nome === instrutor);
    return instrutorEncontrado ? instrutorEncontrado.cor : '#f0f0f0';
  }
}
