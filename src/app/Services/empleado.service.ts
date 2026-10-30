import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../Entitys/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  obtenerPorId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  registrar(empleado: any): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/registrar`, empleado);
  }

  editar(id: number, empleado: any): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}/edit`, empleado);
  }

  darDeBaja(id: number): Observable<Empleado> {
    return this.http.delete<Empleado>(`${this.apiUrl}/${id}`);
  }
}
