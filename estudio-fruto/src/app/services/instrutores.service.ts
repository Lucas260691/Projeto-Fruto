import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instrutor } from '../models/instrutor.model';

@Injectable({
  providedIn: 'root', // Permite que o serviço seja acessado globalmente
})
export class InstrutoresService {
  private apiUrl = 'https://localhost:7209/api/instrutores'; // Ajuste a URL da API

  constructor(private http: HttpClient) {}

  // Método para cadastrar um instrutor
  cadastrarInstrutor(instrutor: Instrutor): Observable<Instrutor> {
    return this.http.post<Instrutor>(`${this.apiUrl}/cadastrar`, instrutor);
  }
}
