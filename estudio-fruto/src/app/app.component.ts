import { Component } from '@angular/core';
import { AgendaComponent } from './features/agenda/agenda.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-agenda></app-agenda>', // Renderiza o componente Agenda
  imports: [AgendaComponent] // Adiciona o AgendaComponent como importação
})
export class AppComponent {}

