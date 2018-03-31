import { SelectedProjectsService } from './../../../services/selected-project.service';
import { SearchProjectsService } from './../../../services/search-projects.service';
import { SerachTasksService } from './../../../services/serach-tasks.service';
import { ProjectsService } from './../../../services/projects.service';
import { AuthService } from './../../../services/auth.service';
import { Project } from './../../../models/project';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ProjectDeleteComponent } from './../project-delete/project-delete.component';
import { ProjectEditComponent } from './../project-edit/project-edit.component';
import { MatSnackBar, MatDialog, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, AfterViewInit {

    public projects: Project[];
    public title: FormControl;
    public onlyYourProjects: FormControl;
    public projectsSearchForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private builder: FormBuilder,
        private router: Router,
        private projectEditModal: MatDialog,
        private projectDeleteModal: MatDialog,
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private projectsService: ProjectsService,
        private serachTasksService: SerachTasksService,
        private searchProjectsService: SearchProjectsService,
        private selectedProjectsService: SelectedProjectsService,
    ) {
        this.title = new FormControl('', [
            Validators.maxLength(50)
        ]);
        this.onlyYourProjects = new FormControl(true);

        this.projectsSearchForm = new FormGroup({
            title: this.title,
            onlyYourProjects: this.onlyYourProjects,
        });
    }

    ngOnInit() {
        this.searchProjectsService.refreshEmmiter.subscribe(event => this.searchProjects());
        this.projectsSearchForm.valueChanges
            .debounceTime(800)
            .subscribe((val) => {
                console.log('valueChanges');
                this.searchProjects();
            });
        this.searchProjects();
    }

    ngAfterViewInit() {
        // this.paginator.page
        //     .subscribe(e => {
        //         console.log(e.pageIndex);
        //         this.projects = [this.loadProjects[e.pageIndex - 1]];
        //     });
    }


    private showProject(project: Project): void {
        this.selectedProjectsService.selectProject(project);
    }

    public createProject(): void {
        const loginRef = this.projectDeleteModal.open(ProjectCreateComponent, {
            width: '90%',
            maxWidth: '700px',
        });
        loginRef.afterClosed().subscribe(result => {
            console.log('Closed');
        });
    }

    public searchProjects(): void {
        if (this.title.value === undefined) {
            this.title.setValue('');
            return;
        }
        this.projectsService.searchProjects(this.title.value, this.onlyYourProjects.value).subscribe((res) => {
            console.log(res);
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
                return;
            }
            this.projects = res as Project[];
        });
    }

    private getUserRole(project: Project): number {
        return project.user_role == null ? 3 : project.user_role;
    }


}
