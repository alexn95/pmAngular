import { Router } from '@angular/router';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {  confirmPasswordValidator} from '../validators/confirm.password.validation';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  
  private matcher = new FormErrorStateMatcher();

  constructor(
    private dialogRef : MatDialogRef<SignupComponent>,
    private builder: FormBuilder,
    private auth : AuthService,
    private snackBar : MatSnackBar,
    private modal : MatDialog
  ) { } 

  ngOnInit() {
  }

  private login = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  private password = new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ])
  private passwordConfirm = new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    confirmPasswordValidator(this.password)
  ])
  private signupForm : FormGroup = this.builder.group({
    login: this.login,
    password: this.password,
    passwordConfirm : this.passwordConfirm
  });

  private signup(){
    this.auth.signup(this.login.value, this.password.value).subscribe(result => {
      console.log(result)
      if (result["status"] == 0){
        this.snackBar.open("Login already exist.", "close", {
          duration: 3000,
        }); 
      } else if (result["status"] == 1) {
        this.dialogRef.close()
        this.modal.open(LoginComponent,{
          width : '500px',
          data: {}
        });
        this.snackBar.open("Your account was created.", "close", {
          duration: 3000,
        }); 
      }
    })
  }

}
