import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-home',
  imports: [MenubarModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  items: MenuItem[] = [
    {
      label: 'Proyectos',
      icon: 'pi pi-id-card',
      routerLink: ['/proyectos']
    },
    {
      label: 'Tareas',
      icon: 'pi pi-user',
      routerLink: ['/tareas']
    },
  ];

  constructor(private authService: AuthService) { }

  logOut(): void {
    this.authService.logOut();
  }
}
