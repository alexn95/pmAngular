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

    public searchTasks( projId: number, title: string, state: string, onlyYourTask: boolean,
                        ofset: number, count: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projId', String(projId));
        data.append('title', title);
        data.append('state', state);
        data.append('onlyYourTask', String(onlyYourTask));
        data.append('ofset', String(ofset));
        data.append('count', String(count));
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

    public deleteTask(taskId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', String(taskId));
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

    public takeTask(taskId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', String(taskId));
        return this.httpService.post('http://pm/takeTask.php', data);
    }

    public leaveTask(taskId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('taskId', String(taskId));
        return this.httpService.post('http://pm/leaveTask.php', data);
    }

}
