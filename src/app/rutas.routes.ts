import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Proyecto } from './components/proyecto/proyecto';
import { authGuard } from './guards/auth-guard';
import { Tarea } from './components/tarea/tarea';

export const lisRutas: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: 'proyectos', component: Proyecto },
      { path: 'tareas', component: Tarea },
    ],
  },
];
