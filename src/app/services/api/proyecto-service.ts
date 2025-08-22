import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {

  Save(proyectos: any[]): void {
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
  }

  GetAll(): any[] {
    const proyectosGuardados = localStorage.getItem('proyectos');
    return proyectosGuardados ? JSON.parse(proyectosGuardados) : [];
  }

  update(proyectoEditado: any): void {
    const proyectos = this.GetAll();
    const index = proyectos.findIndex((p) => p.id === proyectoEditado.id);

    if (index !== -1) {
      proyectos[index] = proyectoEditado;
      this.Save(proyectos);
    }
  }

  delete(id: number): boolean {
    const proyectos = this.GetAll();
    const listaActualizada = proyectos.filter((p) => p.id !== id);
    if (proyectos.length > listaActualizada.length) {
      this.Save(listaActualizada);
      return true;
    } else {
      return false;
    }
  }
}
