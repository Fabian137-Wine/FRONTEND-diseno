import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
import { AdminLayoutComponent } from '../Components/admin-layout/admin-layout.component';
import { AdminDashboardOverviewComponent } from '../Components/admin-dashboard-overview/admin-dashboard-overview.component';
import { EmpleadosComponent } from '../Components/empleados/empleados.component';
import { DepartamentosComponent } from '../Components/departamentos/departamentos.component';
import { NominasComponent } from '../Components/nominas/nominas.component';
import { AsistenciasComponent } from '../Components/asistencias/asistencias.component';
import { AuthGuard } from '../Settings/auth.guard';
import { RoleGuard } from '../Settings/role.guard';
import { RolUsuario } from '../Models/auth.model';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    data: { role: RolUsuario.ADMIN },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardOverviewComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'departamentos', component: DepartamentosComponent },
      { path: 'nominas', component: NominasComponent },
      { path: 'asistencias', component: AsistenciasComponent }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
