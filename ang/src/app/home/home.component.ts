import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @ViewChild('projectsNav') public projectsNav: MatSidenav;
  constructor(
    private sidenavService: SidenavService
   ) {}

  ngOnInit() {
    this.sidenavService.sidenav = this.projectsNav;
    
  }

}
 