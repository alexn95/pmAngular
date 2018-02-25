import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

    public tasks: Task[];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
      this.tasks = [];
  }

  getTask() {
      this.taskService.getTasks().subscribe((res) => {
        this.tasks[0] = res;
      })
  }

}
