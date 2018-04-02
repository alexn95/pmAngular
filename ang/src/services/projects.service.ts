import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {

    constructor(
        private auth: AuthService,
        private httpService: HttpService,
    ) { }

    public searchProjects(title: string, onlyUserProjects: boolean, ofset: number, count: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('onlyUserProjects', String(onlyUserProjects));
        data.append('title', title);
        data.append('ofset', String(ofset));
        data.append('count', String(count));
        return this.httpService.post('http://pm/projects.php', data);
    }

    public createProject(projectData: {}): Observable<any> {
        const data = this.auth.getUserData();
        for (const key in projectData) {
            if (projectData.hasOwnProperty(key)) {
                data.append(key, projectData[key]);
            }
        }
        return this.httpService.post('http://pm/createProject.php', data);
    }

    public updateProject(projectData: {}): Observable<any> {
        const data = this.auth.getUserData();
        for (const key in projectData) {
            if (projectData.hasOwnProperty(key)) {
                data.append(key, projectData[key]);
            }
        }
        return this.httpService.post('http://pm/editProject.php', data);
    }

    public deleteProject(projectId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', String(projectId));
        return this.httpService.post('http://pm/deleteProject.php', data);
    }

    public getProjectById(projectId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', String(projectId));
        return this.httpService.post('http://pm/projectById.php', data);
    }

    public leaveProject(projectId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', String(projectId));
        return this.httpService.post('http://pm/leaveProject.php', data);
    }

    public joinProject(projectId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', String(projectId));
        return this.httpService.post('http://pm/joinProject.php', data);
    }

    public getProjectUsers(projId: number): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projId', String(projId));
        return this.httpService.post('http://pm/projectUsers.php', data);
    }

}
