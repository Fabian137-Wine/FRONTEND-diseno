import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
        <mat-icon style="font-size: 36px; width: 36px; height: 36px; color: #6b46c1;">business</mat-icon>
        <div>
          <h1 style="margin: 0; font-size: 1.8rem; font-weight: 700;">Gestión de Departamentos</h1>
          <p style="margin: 0; color: #6b7280;">Administración de áreas organizacionales</p>
        </div>
      </div>
      <mat-card style="border-radius: 12px;">
        <mat-card-content style="padding: 2rem; text-align: center; color: #6b7280;">
          <mat-icon style="font-size: 48px; width: 48px; height: 48px;">business</mat-icon>
          <p>Módulo en desarrollo</p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class DepartamentosComponent {}
