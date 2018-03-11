import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsService {

  constructor( 
    private auth: AuthService,
    private httpService : HttpService,
  ) { }

  public getProjects(){
    return this.httpService.post("http://pm/projects.php",  this.auth.getUserData())
  }
  
  public createProject(projectData){
    let data = this.auth.getUserData()
    for(let key in projectData){
      data.append(key, projectData[key])
    }
    return this.httpService.post("http://pm/createProject.php",  data)    
  }

  public updateProject(projectData){
    let data = this.auth.getUserData()
    for(let key in projectData){
      data.append(key, projectData[key])
    }
    return this.httpService.post("http://pm/editProject.php",  data)    
  }

  public deleteProject(projectId){
    let data = this.auth.getUserData()
    data.append('projectId', projectId);
    return this.httpService.post("http://pm/deleteProject.php",  data)  
  }

}
