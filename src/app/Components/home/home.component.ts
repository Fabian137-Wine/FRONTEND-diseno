import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string = '';

  ngOnInit(): void {
    // Si es admin, redirige automáticamente al dashboard de administración
    if (this.authService.esAdmin()) {
      this.router.navigate(['/admin']);
      return;
    }
    this.username = this.authService.obtenerUsuario() || 'Usuario';
  }

  logout(): void {
    this.authService.cerrarSesion();
  }
}
