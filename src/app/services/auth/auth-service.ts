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
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      //this.loadProyectos();
      this.router.navigate(['/home']);
      return of(true);
    }
    return of(false);
  }

  logOut(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('proyectos');
    localStorage.removeItem('tareas');
    this.router.navigate(['/login']);
  }
  
}
