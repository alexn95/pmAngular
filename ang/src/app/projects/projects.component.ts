import { SearchProjectsService } from './../../services/search-projects.service';
import { SerachTasksService } from './../../services/serach-tasks.service';
import { ProjectDeleteComponent } from './../project-delete/project-delete.component';
import { ProjectEditComponent } from './../project-edit/project-edit.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Project } from './../../models/project';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  private projects: Project[]
  constructor(
    private router: Router,
    private projectEditModal: MatDialog,
    private projectDeleteModal: MatDialog,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private projectsService: ProjectsService,
    private serachTasksService: SerachTasksService,
    private searchProjectsService: SearchProjectsService,
  ) { }

  ngOnInit() {
    this.showProjects();
    this.searchProjectsService.refreshEmmiter.subscribe(event => this.showProjects())
  }

  private showProjects(){
    this.projectsService.getProjects().subscribe((res) => {
      console.log(res)
      if (!res){
        this.auth.logout()
        this.snackBar.open("Your user session was not valid.", "close", {
          duration: 3000,
        }); 
        return
      }
      this.projects = res as Project[];
    })
  }

  private editProject(project : Project){
    let loginRef = this.projectEditModal.open(ProjectEditComponent,{
      width : '90%',
      maxWidth: '900px',
      data: project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  } 

  private deleteProject(project: Project){
    let loginRef = this.projectDeleteModal.open(ProjectDeleteComponent,{
      width : '90%',
      maxWidth: '300px',
      data: project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

  private createTask(project: Project){
    let loginRef = this.projectDeleteModal.open(TaskCreateComponent,{
      width : '90%',
      maxWidth: '900px',
      data: project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

  private createProject(){
    let loginRef = this.projectDeleteModal.open(ProjectCreateComponent,{
      width : '90%',
      maxWidth: '700px',
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

  private allTasks(){
    
  }


}
