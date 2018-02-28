import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  public login(login: string, pass: string) : any {
    let data = new FormData(); 
    data.append("login", login);
    data.append("pass", pass); 
    return this.http
      .post("http://pm/auth.php", data)
      .map((respons) => respons.json())
  }
}
