import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`, 
  imports: [RouterModule] // Adiciona o AgendaComponent como importação
})
export class AppComponent {}

