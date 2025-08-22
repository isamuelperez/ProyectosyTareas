import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api-service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Home } from "../home/home";
import { threadId } from 'worker_threads';
import { Subject, takeUntil } from 'rxjs';
import { ProyectoService } from '../../services/api/proyecto-service';

@Component({
  selector: 'app-proyecto',
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
],
  templateUrl: './proyecto.html',
  styleUrl: './proyecto.css'
})
export class Proyecto implements OnInit, OnDestroy, AfterViewInit {

  proyectos: any = [];
  filterValue: string = '';
  loading: boolean = true;
  showDialog: boolean = false;
  titleDialog: string = "";
  public myForm!: FormGroup;
  proyecto : any = null;
  isEdit: boolean = false;
  submitted: boolean = false;
  private searchSubject$ = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  id: any = null;
  

  constructor(
    private _apiService: ApiService,
    private _proyectoService: ProyectoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.load()
    this.myForm = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }
  
  ngAfterViewInit(){
    setTimeout(()=>{
      this.load();
      this.proyectos = this._proyectoService.GetAll();
      this.cd.detectChanges();
    },1000)
  }

  load() {
    this._apiService.getAll("users").subscribe({
      next: (resp) => {
       this._proyectoService.Save(resp);
       this.cd.detectChanges();
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

  

  hideDialog(){
    this.showDialog = false;
  }

  openDialog(){
    this.titleDialog = "Registrar Proyecto";
    this.myForm.reset();
    this.submitted = false;
    this.isEdit = false;
    this.showDialog = true;
  }

  edit(proyecto: any): void {
    this.proyecto = { ...proyecto};

    this.id = this.proyecto.id
    let project = {
      id: this.proyecto.id,
      titulo: this.proyecto.name,
      descripcion: this.proyecto.username
    }

    this.titleDialog = "Editar Proyecto";
    this.isEdit = true;
    this.myForm.patchValue(project);
    this.showDialog = true;
  }

  save(): void {

    if (!this.myForm.invalid) {

      this.submitted = true;
      if (this.isEdit) {
        let project = {
          id: this.id,
          name: this.myForm.get("titulo")?.value,
          username: this.myForm.get("descripcion")?.value,
        }
        this._proyectoService.update(project);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se actualizo correctamente', life: 3000 });
        this.proyectos = this._proyectoService.GetAll();
        this.hideDialog();
      } else {

        const maxId = Math.max(...this.proyectos.filter((p: null) => p != null).map((p: { id: any; }) => p.id))
        let project = {
          id: maxId+1,
          name: this.myForm.get("titulo")?.value,
          username: this.myForm.get("descripcion")?.value,
        }

        this.proyectos.push(project);
        this._proyectoService.Save(this.proyectos);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se registro correctamente', life: 3000 });
        this.proyectos = this._proyectoService.GetAll();
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
          if(this._proyectoService.delete(id)){
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se elimino el registro', life: 3000 });
            this.proyectos = this._proyectoService.GetAll();
          }
        }
      }
    });

  }

}
