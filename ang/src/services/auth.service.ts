import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    constructor(
        private httpService: HttpService,
    ) {
    }

    public isAuthorized(): boolean {
        return localStorage.getItem('userStatus') === 'authorized';
    }

    public login(login: string, pass: string): Observable<any> {
        const data = new FormData();
        data.append('login', login);
        data.append('pass', pass);
        return this.httpService.post('http://pm/login.php', data);
    }

    public logout(): void {
        localStorage.removeItem('userStatus');
        localStorage.removeItem('id');
        localStorage.removeItem('login');
        localStorage.removeItem('token');
    }

    public getUserData(): FormData {
        const data = new FormData();
        data.append('token', localStorage.getItem('token'));
        data.append('id', localStorage.getItem('id'));
        data.append('login', localStorage.getItem('login'));
        return data;
    }

    public signup(login: string, pass: string): Observable<any> {
        const data = new FormData();
        data.append('login', login);
        data.append('pass', pass);
        return this.httpService.post('http://pm/signup.php', data);
    }

}
