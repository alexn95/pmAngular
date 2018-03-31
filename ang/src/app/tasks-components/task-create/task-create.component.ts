import { Project } from './../../../models/project';
import { AuthService } from './../../../services/auth.service';
import { ProjectsService } from './../../../services/projects.service';
import { TaskService } from './../../../services/task.service';
import { SerachTasksService } from './../../../services/serach-tasks.service';
import { User } from './../../../models/user';
import { FormErrorStateMatcher } from './../../../models/form-error-state-matcher';
import { Router } from '@angular/router';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html'
})
export class TaskCreateComponent implements OnInit {

    private matcher = new FormErrorStateMatcher();
    private stateTypes: string[];
    private projectUsers: User[];
    private title = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
    ]);
    private type = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
    ]);
    private description = new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(1000)
    ]);
    private state = new FormControl('open', []);
    private user = new FormControl(null, []);
    private taskCreateForm: FormGroup = this.builder.group({
        title: this.title,
        type: this.type,
        description: this.description,
        state: this.state,
        user: this.user,
    });

    constructor(
        private serachTasksService: SerachTasksService,
        private taskService: TaskService,
        private projectsService: ProjectsService,
        private builder: FormBuilder,
        private dialogRef: MatDialogRef<TaskCreateComponent>,
        private router: Router,
        private snackBar: MatSnackBar,
        private auth: AuthService,
        @Inject(MAT_DIALOG_DATA) public project: Project
    ) {
        this.showTaskCreateData();
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
        const taskData = {
            'title': this.title.value,
            'type': this.type.value,
            'description': this.description.value,
            'userId': this.user.value,
            'state': this.state.value,
            'projId': this.project.id,
        };
        console.log(taskData);
        this.taskService.createTask(taskData).subscribe(res => {
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
                this.snackBar.open('Task was created.', 'close', {
                    duration: 3000,
                });
                this.dialogRef.close();
                this.serachTasksService.refresh();
            }
        });
    }

    private cancel(): void {
        this.dialogRef.close();
    }

    private showTaskCreateData(): void {
        this.projectsService.getProjectUsers(this.project.id).subscribe((res) => {
        if (!res) {
            this.dialogRef.close();
            this.auth.logout();
            this.snackBar.open('Your user session was not valid.', 'close', {
                duration: 3000,
            });
            return;
        }
        this.projectUsers = res as User[];
        console.log(this.projectUsers);
        });
    }

}
