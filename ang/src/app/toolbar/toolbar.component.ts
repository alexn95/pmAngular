import { ModalService } from './../../services/modal.service';
import { AuthService } from './../../services/auth.service';
import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
 
  private userAction : String ;

  constructor(public modal : ModalService,
              public auth : AuthService ) {
    this.changeUserAction();
   }

   public changeUserStatus() : void{
    if (localStorage.getItem('userStatus') == 'authorized'){
      this.logout()
    } else {
      this.login()
    }
  }

  public login(){
    this.modal.loginModal().afterClosed().subscribe(result =>{
      console.log('closed')
      this.changeUserAction();
    })
  }

  public logout(){
    this.auth.logout()
    this.changeUserAction();
  }

  public changeUserAction() {
    localStorage.getItem('userStatus') == 'authorized' ? this.userAction = 'Logout' : this.userAction = 'Login' 
  }

}
