import { ProjectsService } from './../../services/projects.service';
import { SelectedProjectsService } from './../../services/selected-project.service';
import { Project } from './../../models/project';
import { SerachTasksService } from './../../services/serach-tasks.service';
import { TaskDeleteComponent } from './../task-delete/task-delete.component';
import { AuthService } from './../../services/auth.service';
import { TaskEditComponent } from './../task-edit/task-edit.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnChanges {

  private project: Project;

  public tasks: Task[];
  
  constructor(
    private taskService: TaskService,
    private router: Router,
    private taskEditModal: MatDialog,
    private taskDeleteModal: MatDialog,
    private auth: AuthService,
    private snackBar : MatSnackBar,
    private serachTasksService: SerachTasksService,
    private selectedProjectsService: SelectedProjectsService,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {   
    this.showTasks()
    this.serachTasksService.refreshEmmiter.subscribe(event => this.showTasks())
    this.selectedProjectsService.projectEmmiter.subscribe(project => this.project = project)
  }

  ngOnChanges(){
  }

  private showTasks() {
    this.taskService.getTasks().subscribe((res) => {
      console.log(res)
      if (!res){
        this.auth.logout()
        this.snackBar.open("Your user session was not valid.", "close", {
          duration: 3000,
        }); 
        return
      }
      this.tasks = res as Task[];
    })
  }
      

  private editTask(task : Task){
    let loginRef = this.taskEditModal.open(TaskEditComponent,{
      width : '90%',
      maxWidth: '900px',
      data: task
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  } 

  public getItems(){
    console.log(localStorage.getItem('id'))
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('login'))
  }

  private deleteTask(task: Task){
    let loginRef = this.taskDeleteModal.open(TaskDeleteComponent,{
      width : '90%',
      maxWidth: '300px',
      data: task
    });
    loginRef.afterClosed().subscribe(result =>{
      console.log("Closed")
    })
  }

    private selectProject(projectId: number){
        this.projectsService.getProjectById(projectId).subscribe((res) =>{
            console.log(res);
            if (!res){
                this.auth.logout()
                this.snackBar.open("Your user session was not valid.", "close", {
                    duration: 3000,
                }); 
                return
            }
            this.selectedProjectsService.selectProject(res[0] as Project);
        });
    }

}
