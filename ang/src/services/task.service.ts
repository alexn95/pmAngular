import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(
    private http: Http
  ) { }

  public getTasks(): any {
    return this.http
      .post("http://pm/tasks.php", {})
      .map((respons) => respons.json())
  }

}
