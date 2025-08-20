import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-sign-up-form',
  imports: [ ReactiveFormsModule, InputTextModule, FloatLabelModule,],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css'
})
export class SignUpForm implements OnInit {

  public myForm!: FormGroup;
  public loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.myForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signIn(){
    this.authService.logIn(this.myForm.get("email")?.value, this.myForm.get("password")?.value).subscribe(success => {
      if (!success) {
        this.loginError = true;
      }
    });
  }
}
