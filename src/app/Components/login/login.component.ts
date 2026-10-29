import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../Services/auth.service';
import { AuthRequest } from '../../Models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);

  credentials: AuthRequest = {
    username: '',
    password: ''
  };

  hidePassword = true;
  loading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.credentials.username.trim() || !this.credentials.password) {
      this.errorMessage = 'Por favor ingrese su usuario y contraseña.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
        // Redirige al usuario según su rol decodificado del JWT
        this.authService.redirigirSegunRol();
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor backend (puerto 8080). Asegúrate de que Spring Boot esté en ejecución.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión. Inténtelo de nuevo.';
        }
        console.error('Error de login:', err);
      }
    });
  }
}
