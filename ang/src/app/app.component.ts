import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private auth : AuthService){}

  private isShowGuestPage(){
    return !this.auth.isAuthorized()
  }

  private isShowMainPage(){
    return this.auth.isAuthorized()
  }
}
