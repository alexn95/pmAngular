import { SelectedProjectsService } from './../../services/selected-project.service';
import { ProjectCreateComponent } from './../project-create/project-create.component';
import { TaskCreateComponent } from './../task-create/task-create.component';
import { ProjectDeleteComponent } from './../project-delete/project-delete.component';
import { ProjectEditComponent } from './../project-edit/project-edit.component';
import { ProjectsService } from './../../services/projects.service';
import { AuthService } from './../../services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-data',
  templateUrl: './project-data.component.html'
})
export class ProjectDataComponent implements OnInit, OnChanges {
  
  private project: Project;

  constructor(
    private router: Router,
    private projectEditModal: MatDialog,
    private projectDeleteModal: MatDialog,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private projectsService: ProjectsService,
    private selectedProjectsService: SelectedProjectsService,
  ) { }

  ngOnInit() {
    this.selectedProjectsService.projectEmmiter.subscribe(project => this.project = project)
  }

  ngOnChanges(){
  }

  private editProject() {
    let loginRef = this.projectEditModal.open(ProjectEditComponent,{
      width : '90%',
      maxWidth: '900px',
      data: this.project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  } 

  private deleteProject(){
    let loginRef = this.projectDeleteModal.open(ProjectDeleteComponent,{
      width : '90%',
      maxWidth: '300px',
      data: this.project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

  private createTask(){
    let loginRef = this.projectDeleteModal.open(TaskCreateComponent,{
      width : '90%',
      maxWidth: '900px',
      data: this.project
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

  

}
