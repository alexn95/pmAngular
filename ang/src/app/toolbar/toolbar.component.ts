import { Router } from '@angular/router';
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

    public icon = 'account_circle';
    public userAction = 'Login';
    public userActionIcon = 'input';
    public projectsAction = 'navigate_before';
    public tooltip = 'Close projects';

    constructor(
        private modal: MatDialog,
        private auth: AuthService,
        private sidenavService: SidenavService,
    ) {
    }

    ngOnInit() {
        this.initUserAction();
    }

    private changeUserStatus(): void {
        this.auth.isAuthorized() ? this.logout() : this.login();
    }

    private isShowProjectToogle(): boolean {
        return this.auth.isAuthorized();
    }

    private initUserAction(): void {
        if (this.auth.isAuthorized()) {
            this.userAction = 'Log out';
            this.userActionIcon = 'exit_to_app';
        } else {
            this.userAction = 'Log in';
            this.userActionIcon = 'input';
        }
    }

    private login(): void {
        this.modal.open(LoginComponent, {
            width: '500px',
            data: {}
        }).afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    private logout(): void {
        this.auth.logout();
    }

    private signup(): void {
        this.modal.open(SignupComponent, {
            width: '500px',
            data: {}
        }).afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    private toggleNav(): void {
        this.sidenavService.sidenav.toggle();
        if (this.sidenavService.sidenav.opened) {
            this.projectsAction = 'navigate_before';
            this.tooltip = 'Close projects';
        } else {
            this.projectsAction = 'navigate_next';
            this.tooltip = 'Open projects';
        }

    }

}
