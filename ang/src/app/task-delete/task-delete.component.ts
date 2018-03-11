import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Task } from './../../models/task';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html'
})
export class TaskDeleteComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private task: Task,
  ) { }

  ngOnInit() {
  }

  private delete(){
    this.taskService.deleteTask(this.task.id).subscribe(res=>{
      if (!res){
        this.dialogRef.close()
        this.auth.logout()
        this.snackBar.open("Your user session was not valid.", "close", {
          duration: 3000,
        }); 
        return
      } else {
        this.dialogRef.close()
        this.snackBar.open("Task was deleted.", "close", {
          duration: 3000,
        }); 
        
      }
    })
  }

  private cancel(){
    this.dialogRef.close();
  }

}
