import { Router } from '@angular/router';
import { IsAuthorized } from './../../models/is-authorized';
import { SignupComponent } from './../signup/signup.component';

import { AuthService } from './../../services/auth.service';
import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  private icon = "account_circle";
  private userAction = "Login";
  private userActionIcon = "input"
  private projectsAction = "Close projects"
  
  constructor(private modal : MatDialog,
              private auth : AuthService,
              private sidenavService : SidenavService,
             ) {
   }

  ngOnInit() {
    this.initUserAction()
  }

  private changeUserStatus() : void{
    this.auth.isAuthorized() ? this.logout() : this.login()
  }
  
  private isShowProjectToogle(){
    return this.auth.isAuthorized();
  }
  
  private initUserAction(){
    if (this.auth.isAuthorized() ){
      this.userAction = "Log out";
      this.userActionIcon = "exit_to_app"
    } else {
      this.userAction = "Log in";
      this.userActionIcon = "input"
    }
  }

  private login(){
    this.modal.open(LoginComponent,{
      width : '500px',
      data: {}
    }).afterClosed().subscribe(result =>{
      console.log('closed')
    })
  }

  private logout(){
    this.auth.logout()
  }

  private signup(){
    this.modal.open(SignupComponent,{
      width : '500px',
      data: {}
    }).afterClosed().subscribe(result =>{
      console.log('closed')
    })
  }

  private toggleNav(){
    this.sidenavService.sidenav.toggle();
    this.projectsAction = this.sidenavService.sidenav.opened ?  "Close projects" : "Open projects"
  }


}
