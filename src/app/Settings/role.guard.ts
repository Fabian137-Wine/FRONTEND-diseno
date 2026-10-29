import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authService.estaAutenticado()) {
      return this.router.createUrlTree(['/login']);
    }

    const expectedRole = route.data['role'];
    if (!expectedRole) {
      return true;
    }

    if (this.authService.tieneRol(expectedRole) || this.authService.esAdmin()) {
      return true;
    }

    // Si no tiene el rol, redirige a su interfaz según el rol que sí posee
    this.authService.redirigirSegunRol();
    return false;
  }
}

