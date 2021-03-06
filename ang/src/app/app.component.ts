import { AuthService } from './../services/auth.service';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'app';

    constructor(private auth: AuthService) { }

    private isShowGuestPage(): boolean {
        return !this.auth.isAuthorized();
    }

    private isShowMainPage(): boolean {
        return this.auth.isAuthorized();
    }
}
