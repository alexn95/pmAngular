import { Observable } from 'rxjs/Observable';
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
        private httpService: HttpService,
    ) { }

    public searchTasks(title: string, projId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projId', projId);
        data.append('title', title);
        return this.httpService.post('http://pm/tasks.php', data);
    }

    public updateTask(taskData): Observable<any> {
        const data = this.auth.getUserData();
        for (const key in taskData) {
            if (taskData.hasOwnProperty(key)) {
                data.append(key, taskData[key]);
            }
        }
        return this.httpService.post('http://pm/editTask.php', data);
    }

    public deleteTask(taskId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', taskId);
        return this.httpService.post('http://pm/deleteTask.php', data);
    }

    public createTask(taskData): Observable<any> {
        const data = this.auth.getUserData();
        for (const key in taskData) {
            if (taskData.hasOwnProperty(key)) {
                data.append(key, taskData[key]);
            }
        }
        return this.httpService.post('http://pm/createTask.php', data);
    }

    public takeTask(taskId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', taskId);
        return this.httpService.post('http://pm/takeTask.php', data);
    }

    public leaveTask(taskId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', taskId);
        return this.httpService.post('http://pm/leaveTask.php', data);
    }

}
