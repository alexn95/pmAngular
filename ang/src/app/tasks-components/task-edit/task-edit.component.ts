import { ProjectsService } from './../../../services/projects.service';
import { TaskService } from './../../../services/task.service';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user';
import { FormErrorStateMatcher } from './../../../models/form-error-state-matcher';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {

    private matcher = new FormErrorStateMatcher();
    private stateTypes: string[];
    private projectUsers: User[];
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
    private state = new FormControl(this.task.task_state, []);
    private user = new FormControl(this.task.user_id, []);
    private TaskEditForm: FormGroup = this.builder.group({
        title: this.title,
        type: this.type,
        description: this.description,
        state: this.state,
        user: this.user,
    });

    constructor(
        private taskService: TaskService,
        private projectsService: ProjectsService,
        private builder: FormBuilder,
        private dialogRef: MatDialogRef<TaskEditComponent>,
        private router: Router,
        private snackBar: MatSnackBar,
        private auth: AuthService,
        @Inject(MAT_DIALOG_DATA) public task: Task
    ) {
        this.showTaskEditData();
        console.log(task);
        this.stateTypes = [
            'open',
            'complete',
            'in progress',
            'taken',
            'to verify',
            'close'
        ];
    }

    ngOnInit() {
    }

    private save(): void {
        if (!this.isTaskChange()) {
            this.snackBar.open('You did not change anything.', 'close', {
                duration: 3000,
            });
            return;
        }
        const taskData = {
            'taskId': this.task.id,
            'title': this.title.value,
            'type': this.type.value,
            'description': this.description.value,
            'userId': this.user.value,
            'state': this.state.value,
            'projId': this.task.project_id,
        };
        console.log(taskData);
        this.taskService.updateTask(taskData).subscribe(res => {
            if (!res) {
                this.dialogRef.close();
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
                return;
            } else if (res['status'] === 0) {
                this.snackBar.open('Task with this title already exists in the project.', 'close', {
                duration: 3000,
                });
            } else if (res['status'] === 1) {
                this.snackBar.open('Task was edited.', 'close', {
                    duration: 3000,
                });
                this.updateTask();
                this.dialogRef.close();
            }
        });
    }

    private cancel(): void {
        this.dialogRef.close();
    }

    private showTaskEditData(): void {
        this.projectsService.getProjectUsers(this.task.project_id).subscribe((res) => {
            if (!res) {
                this.dialogRef.close();
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
            } else {
                this.projectUsers = res as User[];
                console.log(this.projectUsers);
            }
        });
    }

    private isTaskChange(): boolean {
        return (this.task.title !== this.title.value ||
            this.task.type !== this.type.value ||
            this.task.description !== this.description.value ||
            this.task.user_id !== this.user.value ||
            this.task.task_state !== this.state.value) ? true : false;
    }

    private updateTask(): void {
        this.task.title = this.title.value;
        this.task.type = this.type.value;
        this.task.description = this.description.value;
        this.task.user_id = this.user.value;
        const userId = this.user.value;
        if (userId == null) {
            this.task.login = null;
        } else {
            this.task.login = this.projectUsers.find(function(item) { return item.id === userId; }).login;
        }
        this.task.task_state = this.state.value;
        console.log(this.task);
    }

}
