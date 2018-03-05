import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class IsAuthorized implements CanActivate{

    constructor( private auth : AuthService ){
    }

    canActivate(){
        return localStorage.getItem('userStatus') == 'authorized';
    }

}
 