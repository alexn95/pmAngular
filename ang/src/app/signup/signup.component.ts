import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { ModalService } from './../../services/modal.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import {  confirmPasswordValidator} from '../validators/confirm.password.validation';

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
    // private modal : ModalService
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
      
  }

}
