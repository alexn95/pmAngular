import { SelectedProjectsService } from './../../../services/selected-project.service';
import { ProjectsService } from './../../../services/projects.service';
import { SerachTasksService } from './../../../services/serach-tasks.service';
import { AuthService } from './../../../services/auth.service';
import { TaskService } from './../../../services/task.service';
import { Project } from './../../../models/project';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TaskDeleteComponent } from './../task-delete/task-delete.component';
import { TaskEditComponent } from './../task-edit/task-edit.component';
import { MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { resolve } from 'q';
import { Task } from '../../../models/task';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, AfterViewInit {

    public space = '';

    public project: Project;
    public tasks: Task[];
    public paginateTasks: Task[];
    public stateTypes: string[];

    public tasksConunt: number;
    public paginatePageSize: number;
    public paginateSize: number;
    public hasAllTasks: boolean;

    public state: FormControl;
    public title: FormControl;
    public onlyProjectsTasks: FormControl;
    public onlyYourTasks: FormControl;
    public tasksSearchForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private builder: FormBuilder,
        private taskService: TaskService,
        private router: Router,
        private taskEditModal: MatDialog,
        private taskDeleteModal: MatDialog,
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private serachTasksService: SerachTasksService,
        private selectedProjectsService: SelectedProjectsService,
        private projectsService: ProjectsService,
    ) {
        this.title =  new FormControl('', [
            Validators.maxLength(50)
        ]);
        this.onlyProjectsTasks = new FormControl(null);
        this.onlyYourTasks = new FormControl(false);
        this.state = new FormControl('');
        this.tasksSearchForm = new FormGroup({
            title: this.title,
            onlyProjectsTasks: this.onlyProjectsTasks,
            onlyYourTasks: this.onlyYourTasks,
            state: this.state
        });
        this.stateTypes = [
            'open',
            'complete',
            'in progress',
            'taken',
            'to verify',
            'close'
        ];
        this.hasAllTasks = false;
        this.tasksConunt = 0;
        this.paginateSize = 50;
        this.paginatePageSize = 6;
    }

    ngOnInit() {
        this.tasksSearchForm.valueChanges
            .debounceTime(800)
            .subscribe((val) => {
                console.log('valueChanges');
                this.searchTasks();
            });
        this.serachTasksService.refreshEmmiter.subscribe(event => this.searchTasks());
        this.selectedProjectsService.projectEmmiter.subscribe(project => {
            this.project = project;
            this.onlyProjectsTasks.setValue(true);
            this.searchTasks();
        });
        this.searchTasks();
    }

    ngAfterViewInit() {
        this.initPaginate();
    }

    private initPaginate(): void {
        this.paginator.page
        .subscribe(e => {
            const end = ((e.pageIndex + 1) * this.paginatePageSize);
            const start = end - e.pageSize;
            // console.log(start, end);
            // console.log((end + this.paginatePageSize) + ' > ' + this.projectsConunt);
            if ((end + this.paginatePageSize) > this.tasksConunt && !this.hasAllTasks) {
                this.searchTasks(this.tasksConunt);
            }
            this.paginateTasks = this.tasks.slice(start, end);
        });
    }

    private searchTasks(ofset: number = 0): void {
        if (this.title.value === undefined) {
            this.title.setValue('');
            return;
        }
        const projId = this.onlyProjectsTasks.value && this.project !== undefined ? this.project.id : -1;
        this.taskService.searchTasks(
                projId,
                this.title.value.trim(),
                this.state.value,
                this.onlyYourTasks.value,
                ofset,
                this.paginateSize)
            .subscribe((res) => {
                console.log(res);
                if (!res) {
                    this.auth.logout();
                    this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                    });
                } else {
                    const newTasks = res as Task[];
                    if (ofset === 0) {
                        this.tasks = newTasks;
                        this.paginateTasks = this.tasks.slice(ofset, this.paginatePageSize);
                        this.paginator.firstPage();
                    } else {
                        this.tasks = this.tasks.concat(newTasks);
                        console.log(this.tasks);
                    }
                    this.tasksConunt = this.tasks.length;
                    this.hasAllTasks = newTasks.length === 0 || (this.tasksConunt % this.paginatePageSize) !== 0;
                }
            });
    }


    private editTask(task: Task): void {
        const loginRef = this.taskEditModal.open(TaskEditComponent, {
            width: '90%',
            maxWidth: '900px',
            data: task
        });
        loginRef.afterClosed().subscribe(result => {
            console.log('Closed');
        });
    }

    public showItems(): void {
        console.log(localStorage.getItem('id'));
        console.log(localStorage.getItem('token'));
        console.log(localStorage.getItem('login'));
    }

    private deleteTask(task: Task): void {
        const loginRef = this.taskDeleteModal.open(TaskDeleteComponent, {
            width: '90%',
            maxWidth: '300px',
            data: task
        });
        loginRef.afterClosed().subscribe(result => {
            console.log('Closed');
        });
    }

    private selectProject(projectId: number): void {
        this.projectsService.getProjectById(projectId).subscribe((res) => {
            console.log(res);
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                duration: 3000,
                });
            } else {
                this.selectedProjectsService.selectProject(res[0] as Project);
            }
        });
    }

    public takeTask(task: Task): void {
        this.taskService.takeTask(task.id).subscribe(res => {
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
            } else {
                this.snackBar.open('Task was taked.', 'close', {
                    duration: 3000,
                });
                task.user_id = Number(localStorage.getItem('id'));
                task.login = localStorage.getItem('login');
            }
        });
    }

    public leaveTask(task: Task): void {
        this.taskService.leaveTask(task.id).subscribe(res => {
            if (!res) {
                this.auth.logout();
                this.snackBar.open('Your user session was not valid.', 'close', {
                    duration: 3000,
                });
            } else {
                this.snackBar.open('Task was leaved.', 'close', {
                    duration: 3000,
                });
                task.user_id = null;
                task.login = null;
            }
        });
    }

    public getUserRole(task: Task): number {
        return task.user_role == null ? 3 : task.user_role;
    }

    public isTaskFree(task: Task): boolean {
        return task.user_id == null;
    }

    public isTakedTask(task: Task): boolean {
        return task.user_id === Number(localStorage.getItem('id'));
    }

}
