import { Project } from './../../../models/project';
import { AuthService } from './../../../services/auth.service';
import { ProjectsService } from './../../../services/projects.service';
import { SearchProjectsService } from './../../../services/search-projects.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../models/form-error-state-matcher';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
})
export class ProjectEditComponent implements OnInit {

    private matcher = new FormErrorStateMatcher();
    private stateTypes: string[];

    private title = new FormControl(this.project.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
    ]);

    private state = new FormControl(this.project.project_state, []);

    private description = new FormControl(this.project.description, [
        Validators.minLength(3),
        Validators.maxLength(200)
    ]);

    private projectEditForm: FormGroup = this.builder.group({
        title: this.title,
        description: this.description,
        state: this.state,
    });

    constructor(
        private searchProjectsService: SearchProjectsService,
        private projectService: ProjectsService,
        private builder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private auth: AuthService,
        private dialogRef: MatDialogRef<ProjectEditComponent>,
        @Inject(MAT_DIALOG_DATA) public project: Project
    ) {
        this.stateTypes = [
            'open',
            'complete',
            'in progress',
            'to verify',
            'close'
        ];
    }

    ngOnInit() {
    }

    private save(): void {
        if (!this.isProjectChange()) {
            this.snackBar.open('You did not change anything.', 'close', {
                duration: 3000,
            });
            return;
        }
        const projectData = {
            'title': this.title.value,
            'description': this.description.value,
            'state': this.state.value,
        };
        console.log(projectData);
        this.projectService.updateProject(projectData).subscribe(res => {
            if (!res) {
                this.dialogRef.close();
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
                return;
            } else if (res['status'] === 0) {
                this.snackBar.open('Project with this title already exists.', 'close', {
                    duration: 3000,
                });
            } else if (res['status'] === 1) {
                this.snackBar.open('Project was edited.', 'close', {
                    duration: 3000,
                });
                this.updateProject();
                this.dialogRef.close();
            }
        });

    }

    private cancel(): void {
        this.dialogRef.close();
    }

    private isProjectChange(): boolean {
        return (this.project.title !== this.title.value ||
            this.project.description !== this.description.value ||
            this.project.project_state !== this.state.value) ? true : false;
    }

    private updateProject(): void {
        this.project.title = this.title.value;
        this.project.description = this.description.value;
        this.project.project_state = this.state.value;
        console.log(this.project);
    }


}
