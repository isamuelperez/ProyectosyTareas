import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,   private _apiService: ApiService,) { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }

  logIn(username: string, password: string): Observable<boolean> {
    console.log(username);
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      this.loadProyectos();
      this.router.navigate(['/home']);
      return of(true);
    }
    return of(false);
  }

  logOut(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('proyectos');
    this.router.navigate(['/login']);
  }

  loadProyectos() {
    this._apiService.getAll("users").subscribe({
      next: (resp) => {
       this._apiService.SaveProyecto(resp);
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      }
    });
  }
  
}
