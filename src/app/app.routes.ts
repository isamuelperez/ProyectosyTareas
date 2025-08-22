import { Routes } from '@angular/router';
import { SignUpForm } from './components/auth/sign-up-form/sign-up-form';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignUpForm },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./rutas.routes').then((r) => r.lisRutas),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
