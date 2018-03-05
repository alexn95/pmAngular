import { User } from './../../models/user';
import { TaskState } from './../../models/task-state';
import { TaskService } from './../../services/task.service';
import { FormErrorStateMatcher } from './../../models/form-error-state-matcher';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {

  private matcher = new FormErrorStateMatcher();
  private stateTypes : TaskState[];
  private projectUsers : User[];
  private title = new FormControl(this.task.title, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  private type = new FormControl(this.task.type, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);
  private description = new FormControl(this.task.description, [
    Validators.minLength(3),
    Validators.maxLength(1000)
  ]);
  private state = new FormControl(this.task.state_id, [
  ]);
  private user = new FormControl(this.task.user_id, [
  ]);
  private TaskEditForm: FormGroup = this.builder.group({
    title: this.title,
    type : this.type,
    description : this.description,
    state : this.state,
    user : this.user,
  });

  constructor(
    private taskService : TaskService,
    private builder: FormBuilder,
    private dialogRef : MatDialogRef<TaskEditComponent>,
    private router : Router,
    private snackBar : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public task: Task  
  ) {
    this.showTaskEditData()
    console.log(task);
  }

  ngOnInit() {
  }

  public save(){
    if(!this.isTaskChange()){
      this.snackBar.open("Нou did not change anything.", "close", {
        duration: 3000,
      });
      return;
    }
    let taskData = {
      "taskId" : this.task.id,
      "title" : this.title.value,
      "type" : this.type.value,
      "description" : this.description.value,
      "userId" : this.user.value,
      "stateId" : this.state.value, 
      "projId" : this.task.project_id,
    }
    console.log(taskData)
    this.taskService.updateTask(taskData).subscribe(res=>{
      if (!res){
        this.router.navigate(['permission-error'])
        return
      } else if (res['status'] == 0){
        this.snackBar.open("Task with this title already exists in the project.", "close", {
          duration: 3000,
        });
      } else if (res['status'] == 1){
        this.snackBar.open("Task was edited.", "close", {
          duration: 3000,
        });
        this.updateTask()
        this.dialogRef.close()
      }
    })
    
  }

  public cancel(){
    this.dialogRef.close()
  }

  public showTaskEditData(){
    this.taskService.getTaskEditData(this.task.project_id).subscribe((res) => {
      if (!res){
        this.router.navigate(['permission-error'])
        return
      }
      let result = res as [TaskState[], User[]];
      this.stateTypes = result[0];
      this.projectUsers = result[1];
      console.log(result)
    })
  }

  private isTaskChange(){
    return (this.task.title != this.title.value ||
            this.task.type != this.type.value ||
            this.task.description != this.description.value ||
            this.task.user_id != this.user.value ||
            this.task.state_id != this.state.value) ? true : false
  }

  private updateTask(){
    this.task.title = this.title.value;
    this.task.type = this.type.value;
    this.task.description = this.description.value
    this.task.user_id = this.user.value
    let userId = this.user.value
    if (userId == null){
      this.task.login = null
    } else {
      this.task.login = this.projectUsers.find( function(item) { return item.id == userId } ).login;
    }
    this.task.state_id = this.state.value
    let stateId = this.state.value
    this.task.task_state = this.stateTypes.find( function(item) { return item.id == stateId } ).title;
    console.log(this.task)
  }

}
