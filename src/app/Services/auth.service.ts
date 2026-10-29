import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, JwtPayload, RolUsuario } from '../Models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'gemula_auth_token';
  private readonly USER_KEY = 'gemula_auth_user';

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        if (response && response.token) {
          this.guardarSesion(response);
        }
      })
    );
  }

  guardarSesion(response: AuthResponse): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, response.username || '');
    }
  }

  guardarToken(token: string): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  obtenerToken(): string | null {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY) || localStorage.getItem('token');
    }
    return null;
  }

  obtenerUsuario(): string | null {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.USER_KEY);
      if (stored) return stored;
    }
    const payload = this.decodificarToken();
    return payload?.sub || null;
  }

  eliminarToken(): void {
    this.cerrarSesion();
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;

    const payload = this.decodificarToken();
    if (!payload) return false;

    // Verificar si el token no ha expirado
    if (payload.exp) {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp < nowInSeconds) {
        this.cerrarSesion();
        return false;
      }
    }

    return true;
  }

  decodificarToken(): JwtPayload | null {
    const token = this.obtenerToken();
    if (!token) return null;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload) as JwtPayload;
    } catch (e) {
      console.error('Error al decodificar JWT', e);
      return null;
    }
  }

  obtenerRoles(): string[] {
    const payload = this.decodificarToken();
    if (!payload || !payload.roles) return [];
    return payload.roles;
  }

  tieneRol(rol: string): boolean {
    const roles = this.obtenerRoles();
    return roles.includes(rol);
  }

  esAdmin(): boolean {
    return this.tieneRol(RolUsuario.ADMIN) || this.tieneRol('ADMIN');
  }

  redirigirSegunRol(): void {
    const roles = this.obtenerRoles();

    if (roles.includes(RolUsuario.ADMIN) || roles.includes('ADMIN')) {
      this.router.navigate(['/admin']);
      return;
    }

    if (roles.includes(RolUsuario.RRHH) || roles.includes('RRHH')) {
      this.router.navigate(['/rrhh']);
      return;
    }

    if (roles.includes(RolUsuario.EMPLEADO) || roles.includes('EMPLEADO')) {
      this.router.navigate(['/empleado']);
      return;
    }

    // Por defecto redirige al panel de administración o inicio
    this.router.navigate(['/admin']);
  }
}
