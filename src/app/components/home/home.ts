import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth-service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MenubarModule, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  items: MenuItem[] = [
    {
      label: 'Proyectos',
      icon: 'pi pi-calendar-plus',
      routerLink: ['/home/proyectos']
    },
    {
      label: 'Tareas',
      icon: 'pi pi-book',
      routerLink: ['/home/tareas']
    },
  ];

  constructor(private authService: AuthService) { }

  logOut(): void {
    this.authService.logOut();
  }
}
