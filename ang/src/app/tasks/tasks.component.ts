import { TaskEditComponent } from './../task-edit/task-edit.component';
import { MatDialog } from '@angular/material';
import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  public tasks: Task[];
  
  constructor(
    private taskService: TaskService,
    private router : Router,
    private taskEditModal : MatDialog
  ) { this.showTasks() }

  ngOnInit() {    
  }

  showTasks() {
    this.taskService.getTasks().subscribe((res) => {
      console.log(res)
      if (!res){
        this.router.navigate(['permission-error'])
        return
      }
      this.tasks = res as Task[];
    })
  }
      

  editTask(task : Task){
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

}
