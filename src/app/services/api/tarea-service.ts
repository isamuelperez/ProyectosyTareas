import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
    
  Save(proyectos: any[]): void {
    localStorage.setItem('tareas', JSON.stringify(proyectos));
  }

  GetAll(): any[] {
    const tareasGuardados = localStorage.getItem('tareas');
    return tareasGuardados ? JSON.parse(tareasGuardados) : [];
  }

  update(tareaEditada: any): void {
    const tareas = this.GetAll();
    const index = tareas.findIndex(t => t.id === tareaEditada.id);

    if (index !== -1) {
      tareas[index] = tareaEditada;
      this.Save(tareas);
    }
  }

  delete(id: number): boolean {
    const tareas = this.GetAll();
    const listaActualizada = tareas.filter(p => p.id !== id);
    if(tareas.length>listaActualizada.length){
      this.Save(listaActualizada);
      return true;
    }else{
      return false;
    }
  }
}
