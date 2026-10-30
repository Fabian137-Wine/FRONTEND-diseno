import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="overview-container">
      <h1 style="color: #6b46c1; margin-bottom: 1.5rem;">Dashboard</h1>
      <mat-card style="border-radius: 12px;">
        <mat-card-content style="padding: 2rem;">
          <h2 style="color: #6b46c1;">Bienvenido al Panel de Administración</h2>
          <p style="color: #6b7280;">Selecciona una opción del menú lateral para gestionar el sistema.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .overview-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AdminDashboardOverviewComponent {}
