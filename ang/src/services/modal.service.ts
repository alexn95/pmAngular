import { SignupComponent } from './../app/signup/signup.component';
import { ToolbarComponent } from './../app/toolbar/toolbar.component';
import { LoginComponent } from './../app/login/login.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  constructor(private modal : MatDialog) { }

  public loginModal(){
    return this.modal.open(LoginComponent,{
      width : '500px',
      data: {}
    });
  }

  public regitrationModal(){
    return this.modal.open(SignupComponent,{
      width : '500px',
      data: {}
    });
  }

}
