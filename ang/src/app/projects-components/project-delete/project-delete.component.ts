import { Project } from './../../../models/project';
import { ProjectsService } from './../../../services/projects.service';
import { AuthService } from './../../../services/auth.service';
import { SearchProjectsService } from './../../../services/search-projects.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-project-delete',
    templateUrl: './project-delete.component.html'
})
export class ProjectDeleteComponent implements OnInit {

    constructor(
        private searchProjectsService: SearchProjectsService,
        private auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private projectService: ProjectsService,
        private dialogRef: MatDialogRef<ProjectDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) private project: Project,
    ) { }

    ngOnInit() {
    }

    private delete(): void {
        this.projectService.deleteProject(this.project.id).subscribe(res => {
            if (!res) {
                this.dialogRef.close();
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
            } else {
                this.dialogRef.close();
                this.searchProjectsService.refresh();
                this.snackBar.open('Project was deleted.', 'close', {
                    duration: 3000,
                });
            }
        });
    }

    private cancel(): void {
        this.dialogRef.close();
    }

}
