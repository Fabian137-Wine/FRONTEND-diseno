import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  username: string = 'admin';
  roles: string[] = ['ROLE_ADMIN'];
  backendStatus: 'conectado' | 'desconectado' | 'verificando' = 'verificando';

  // Datos del backend
  empleadosCount: number = 0;
  departamentosCount: number = 0;
  nominasCount: number = 0;
  loadingData: boolean = false;

  ngOnInit(): void {
    this.username = this.authService.obtenerUsuario() || 'admin';
    this.roles = this.authService.obtenerRoles();
    if (this.roles.length === 0) {
      this.roles = ['ROLE_ADMIN'];
    }
    this.verificarBackend();
  }

  verificarBackend(): void {
    this.loadingData = true;
    this.backendStatus = 'verificando';

    // Intenta consultar la API de empleados para verificar conectividad con token
    this.http.get<any[]>('http://localhost:8080/api/empleados?page=0&size=10').subscribe({
      next: (data) => {
        this.backendStatus = 'conectado';
        this.empleadosCount = Array.isArray(data) ? data.length : 0;
        this.loadingData = false;
      },
      error: (err) => {
        // Si responde 401/403 o no responde
        if (err.status === 0) {
          this.backendStatus = 'desconectado';
        } else {
          // Si respondió el backend aunque sea con otro estado HTTP
          this.backendStatus = 'conectado';
        }
        this.loadingData = false;
      }
    });
  }

  logout(): void {
    this.authService.cerrarSesion();
  }
}

