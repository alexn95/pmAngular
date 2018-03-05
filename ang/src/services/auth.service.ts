import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private httpService : HttpService,
  ) { }

  public login(login: string, pass: string) : any {
    let data = new FormData(); 
    data.append("login", login);
    data.append("pass", pass); 
    return this.httpService.post("http://pm/login.php", data)
  }

  public logout(){
    localStorage.removeItem("userStatus");
    localStorage.removeItem("id");
    localStorage.removeItem("login");
    localStorage.removeItem("token");
  }

  // public checkAuth(){
  //   let data = new FormData(); 
  //   data.append("token", localStorage.getItem("token"));
  //   data.append("id", localStorage.getItem("id"));
  //   data.append("login", localStorage.getItem("login"));
  //   return this.http
  //     .post("http://pm/checkAuth.php", data)
  //     .map((respons) => respons.json())
  // }

  public getUserData() {
      let data = new FormData(); 
      data.append("token", localStorage.getItem("token"));
      data.append("id", localStorage.getItem("id"));
      data.append("login", localStorage.getItem("login"));
      return data;
  }

  public signup(login: string, pass: string): any {
    let data = new FormData(); 
    data.append("login", login);
    data.append("pass", pass); 
    return this.httpService.post("http://pm/signup.php", data)
  }
}
