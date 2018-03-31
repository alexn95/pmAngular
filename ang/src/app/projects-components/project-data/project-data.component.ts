import { SelectedProjectsService } from './../../../services/selected-project.service';
import { ProjectsService } from './../../../services/projects.service';
import { AuthService } from './../../../services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../../../models/project';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';
import { TaskCreateComponent } from '../../tasks-components/task-create/task-create.component';

@Component({
    selector: 'app-project-data',
    templateUrl: './project-data.component.html'
})
export class ProjectDataComponent implements OnInit, OnChanges {

    public project: Project;

    constructor(
        private projectService: ProjectsService,
        private router: Router,
        private projectEditModal: MatDialog,
        private projectDeleteModal: MatDialog,
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private projectsService: ProjectsService,
        private selectedProjectsService: SelectedProjectsService,
    ) { }

    ngOnInit() {
        this.selectedProjectsService.projectEmmiter.subscribe(project => this.project = project);
    }

    ngOnChanges() {
    }

    public editProject(): void {
        const loginRef = this.projectEditModal.open(ProjectEditComponent, {
        width: '90%',
        maxWidth: '900px',
        data: this.project
        });
        loginRef.afterClosed().subscribe(result => {
        console.log('Closed');
        });
    }

    public deleteProject(): void {
        const loginRef = this.projectDeleteModal.open(ProjectDeleteComponent, {
            width: '90%',
            maxWidth: '300px',
            data: this.project
        });
        loginRef.afterClosed().subscribe(result => {
            console.log('Closed');
        });
    }

    public createTask(): void {
        const loginRef = this.projectDeleteModal.open(TaskCreateComponent, {
            width: '90%',
            maxWidth: '900px',
            data: this.project
        });
        loginRef.afterClosed().subscribe(result => {
            console.log('Closed');
        });
    }

    public joinProject(): void {
        this.projectService.joinProject(this.project.id).subscribe(res => {
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
                return;
            } else {
                this.snackBar.open('Project was joined.', 'close', {
                    duration: 3000,
                });
                this.project.user_role = 2;
            }
        });
    }

    public leaveProject(): void {
        this.projectService.leaveProject(this.project.id).subscribe(res => {
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
                return;
            } else {
                this.project.user_role = null;
                this.snackBar.open('Project was leaved.', 'close', {
                    duration: 3000,
                });
            }
        });
    }

    public getUserRole(): number {
        let result: number;
        if (this.project === undefined) {
            result = 0;
        } else if (this.project.user_role == null) {
            result = 3;
        } else {
            result = this.project.user_role;
        }
        return result;
    }



}
