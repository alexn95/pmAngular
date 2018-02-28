import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { LoginErrorStateMatcher } from '../../models/login-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private serverError : String;
  private passTooltip  = "pass is required"
  private loginTooltip = "login is required";
  private matcher = new LoginErrorStateMatcher();

  constructor(
    private builder: FormBuilder,
    private auth : AuthService,
    private router : Router,
    private dialogRef : MatDialogRef<LoginComponent>,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {}

  private login = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  private password = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  private loginForm: FormGroup = this.builder.group({
    login: this.login,
    password: this.password
  });

    

  public logIn(){
    this.auth.login(this.login.value, this.password.value).subscribe(result => {
      console.log(result)
      if (result["id"] == null){
        this.snackBar.open("Login or password is not valid.", "close", {
          duration: 3000,
        }); 
      } else {
        localStorage.setItem("token",result["token"])
        this.router.navigate(["tasks"]);
        this.dialogRef.close()
        this.snackBar.open("You are authorized.", "close", {
          duration: 3000,
        }); 
      }
    })
  }

}
