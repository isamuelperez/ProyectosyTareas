import { Routes } from '@angular/router';
import { SignUpForm } from './components/auth/sign-up-form/sign-up-form';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { Proyecto } from './components/proyecto/proyecto';
import { Tarea } from './components/tarea/tarea';

export const routes: Routes = [ 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignUpForm },
  { path: 'home', component: Home},//, canActivate: [authGuard] },
  { path: 'proyectos', component: Proyecto },
  { path: 'tareas', component: Tarea,  }
];
