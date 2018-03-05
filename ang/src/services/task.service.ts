import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TaskService {

  constructor(
    private auth: AuthService,
    private httpService : HttpService,
  ) { }

  public getTasks() {
    return this.httpService.post("http://pm/tasks.php",  this.auth.getUserData())
  }  

  public getTaskEditData(projId){
    let data = this.auth.getUserData()
    data.append("projId", projId)
    return this.httpService.post("http://pm/taskEditData.php",  data)
  }

  public updateTask(taskData){
    let data = this.auth.getUserData()
    for(let key in taskData){
      data.append(key, taskData[key])
    }
    return this.httpService.post("http://pm/editTask.php",  data)    
  }

}

