import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api-service';

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea implements OnInit{

  tareas: any = [];
  constructor(private _apiService: ApiService){}

  ngOnInit(): void {
    this.loadTareas();
    
    console.log(this.tareas)
  }

  
  loadTareas(): void {
    this._apiService.getAll("todos").subscribe({
      next: (resp) => {
        console.log(resp)
       this.tareas = resp;
      },
      error: (error) => {
        //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar estudiantes', life: 3000 });
        console.error('Error al cargar las tareas:', error);
      }
    });
  }
}