import { FormBuilder, Validators } from '@angular/forms';
import { SelectedProjectsService } from './../../services/selected-project.service';
import { SearchProjectsService } from './../../services/search-projects.service';
import { SerachTasksService } from './../../services/serach-tasks.service';
import { ProjectDeleteComponent } from './../project-delete/project-delete.component';
import { ProjectEditComponent } from './../project-edit/project-edit.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Project } from './../../models/project';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

    private projects: Project[]

    public title =  this.builder.control('', [
        Validators.maxLength(50)
    ]);
    public onlyYourProjects = this.builder.control([]);
    public projectsSearchForm = this.builder.group({
        title : this.title,
        onlyYourProjects: this.onlyYourProjects,
    });

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
    ) { }

    ngOnInit() {

        this.searchProjectsService.refreshEmmiter.subscribe(event => this.searchProjects())
        this.projectsSearchForm.valueChanges
            .debounceTime(800)
            .subscribe((val) =>{
                console.log('valueChanges');
                this.searchProjects();
            })
        this.searchProjects();
    }


    private showProject(project: Project) {
        this.selectedProjectsService.selectProject(project);
    }

    public createProject(){
        let loginRef = this.projectDeleteModal.open(ProjectCreateComponent,{
            width : '90%',
            maxWidth: '700px',
        });
        loginRef.afterClosed().subscribe(result =>{
            console.log("Closed")
        })
    }

    public searchProjects(){
        if (this.title.value == undefined) {
            this.title.setValue('');
            return;
        }
        this.projectsService.searchProjects(this.title.value, this.onlyYourProjects.value).subscribe((res) => {
            console.log(res)
            if (!res){
                this.auth.logout()
                this.snackBar.open("Your user session was not valid.", "close", {
                    duration: 3000,
                }); 
                return
            }
            this.projects = res as Project[];
        })
    }


}
