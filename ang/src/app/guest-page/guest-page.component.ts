import { SignupComponent } from './../signup/signup.component';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './../login/login.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-guest-page',
    templateUrl: './guest-page.component.html',
})
export class GuestPageComponent implements OnInit {

    constructor(
        private modal: MatDialog,
        private auth: AuthService,
    ) { }

    ngOnInit() {
    }

    private login() {
        this.modal.open(LoginComponent, {
            width: '500px',
            data: {}
        }).afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    private signup() {
        this.modal.open(SignupComponent, {
            width: '500px',
            data: {}
        }).afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

}
