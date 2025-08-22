import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api-service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { TareaService } from '../../services/api/tarea-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-tarea',
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    CheckboxModule
  ],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea implements OnInit, OnDestroy, AfterViewInit {

  tareas: any = [];
  filterValue: string = '';
  loading: boolean = true;
  showDialog: boolean = false;
  titleDialog: string = "";
  public myForm!: FormGroup;
  tarea : any = null;
  isEdit: boolean = false;
  submitted: boolean = false;
  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  id: any = null;
  

  constructor(
    private _apiService: ApiService,
    private _tareaService: TareaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.load();

    this.tareas = this._tareaService.GetAll();
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      completed: ['',],
    });
    this.cd.detectChanges();
  }

  load() {
    this._apiService.getAll("todos").subscribe({
      next: (resp) => {
       this._tareaService.Save(resp);
      },
      error: (error) => {
        this.messageService.add({ severity: 'danger', summary: 'Fallo', detail: 'Error al obtener los registros', life: 3000 });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
     setTimeout(()=>{
      this.load();
      this.tareas = this._tareaService.GetAll();
      this.cd.detectChanges();
    },1000)
  }
  

  hideDialog(){
    this.showDialog = false;
  }

  openDialog(){
    this.titleDialog = "Registrar Tarea";
    this.myForm.reset();
    this.submitted = false;
    this.isEdit = false;
    this.showDialog = true;
  }

  edit(tarea: any): void {
    this.tarea = { ...tarea};

    this.id = this.tarea.id
    let task = {
      id: this.tarea.id,
      title: this.tarea.title,
      completed: this.tarea.completed
    }

    this.titleDialog = "Editar Tarea";
    this.isEdit = true;
    this.myForm.patchValue(task);
    this.showDialog = true;
  }

  save(): void {

    if (!this.myForm.invalid) {

      this.submitted = true;
      if (this.isEdit) {
        let task = {
          id: this.id,
          title: this.myForm.get("title")?.value,
          completed: this.myForm.get("completed")?.value,
        }
        this._tareaService.update(task);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se actualizo correctamente', life: 3000 });
        this.tareas = this._tareaService.GetAll();
        this.hideDialog();
      } else {

        const maxId = Math.max(...this.tareas.filter((p: null) => p != null).map((p: { id: any; }) => p.id))
        let task = {
          id: maxId+1,
          title: this.myForm.get("title")?.value,
          completed: this.myForm.get("completed")?.value,
        }

        this.tareas.push(task);
        this._tareaService.Save(this.tareas);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se registro correctamente', life: 3000 });
        this.tareas = this._tareaService.GetAll();
        this.hideDialog();
      }
    } else {
      this.myForm.markAllAsTouched();
    }

  }

  delete(id: any){

    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar el registro ?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (id) {
          if(this._tareaService.delete(id)){
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se elimino el registro', life: 3000 });
            this.tareas = this._tareaService.GetAll();
          }
        }
      }
    });

  }

  
}