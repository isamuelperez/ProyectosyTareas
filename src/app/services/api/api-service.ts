import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  getAll<T>(entity: string): Observable<T[]> {
    return this.http.get<any>(`${this.baseUrl}/${entity}/`);
  }

  SaveProyecto(proyectos: any[]): void {
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
  }

  GetProyectos(): any[] {
    const proyectosGuardados = localStorage.getItem('proyectos');
    return proyectosGuardados ? JSON.parse(proyectosGuardados) : [];
  }

  updateProyecto(proyectoEditado: any): void {
    const proyectos = this.GetProyectos();
    console.log(proyectoEditado);
    const index = proyectos.findIndex(p => p.id === proyectoEditado.id);

    if (index !== -1) {
      proyectos[index] = proyectoEditado;
      this.SaveProyecto(proyectos);
    }
  }

  deleteProyecto(id: number): boolean {
    const proyectos = this.GetProyectos();
    const listaActualizada = proyectos.filter(p => p.id !== id);
    if(proyectos.length>listaActualizada.length){
      this.SaveProyecto(listaActualizada);
      return true;
    }else{
      return false;
    }
  }
}
