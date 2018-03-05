import { AuthService } from './../../services/auth.service';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-error',
  templateUrl: './permission-error.component.html'
})
export class PermissionErrorComponent implements OnInit {

  constructor(private auth: AuthService ) {
    auth.logout()
   }

  ngOnInit() {
  }


}
