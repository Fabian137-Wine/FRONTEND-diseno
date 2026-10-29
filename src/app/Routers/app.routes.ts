import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
import { AdminDashboardComponent } from '../Components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../Settings/auth.guard';
import { RoleGuard } from '../Settings/role.guard';
import { RolUsuario } from '../Models/auth.model';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { role: RolUsuario.ADMIN }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

