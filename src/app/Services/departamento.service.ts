import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../Entitys/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/api/departamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  crear(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }
}
