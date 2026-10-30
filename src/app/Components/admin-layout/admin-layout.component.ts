import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  username: string = 'Administrador';
  roles: string[] = [];

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' },
    { icon: 'badge', label: 'Empleados', route: '/admin/empleados' },
    { icon: 'business', label: 'Departamentos', route: '/admin/departamentos' },
    { icon: 'payments', label: 'Nominas', route: '/admin/nominas' },
    { icon: 'event_available', label: 'Asistencias', route: '/admin/asistencias' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.obtenerUsuario() || 'Administrador';
    this.roles = this.authService.obtenerRoles();
  }

  logout(): void {
    this.authService.cerrarSesion();
  }
}
