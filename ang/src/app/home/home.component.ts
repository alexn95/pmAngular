import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public loginModal : MatDialog ) {}

  public openLoginModal() : void{
    let loginRef = this.loginModal.open(LoginComponent,{
      width : '500px',
      data: {}
    });

    loginRef.afterClosed().subscribe(result =>{
      console.log('closed')
    })
  }

  ngOnInit() {
  }

}
