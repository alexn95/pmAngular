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

    public searchProjects(title: string, onlyUserProjects: boolean): Observable<any> {
        const data = this.auth.getUserData();
        data.append('onlyUserProjects', onlyUserProjects.toString());
        data.append('title', title);
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

    public updateProject(projectData): Observable<any> {
        const data = this.auth.getUserData();
        for (const key in projectData) {
            if (projectData.hasOwnProperty(key)) {
                data.append(key, projectData[key]);
            }
        }
        return this.httpService.post('http://pm/editProject.php', data);
    }

    public deleteProject(projectId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', projectId);
        return this.httpService.post('http://pm/deleteProject.php', data);
    }

    public getProjectById(projectId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', projectId);
        return this.httpService.post('http://pm/projectById.php', data);
    }

    public leaveProject(projectId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', projectId);
        return this.httpService.post('http://pm/leaveProject.php', data);
    }

    public joinProject(projectId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projectId', projectId);
        return this.httpService.post('http://pm/joinProject.php', data);
    }

    public getProjectUsers(projId): Observable<any> {
        const data = this.auth.getUserData();
        data.append('projId', projId);
        return this.httpService.post('http://pm/projectUsers.php', data);
    }

}
