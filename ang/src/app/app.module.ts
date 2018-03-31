
import { ProjectCreateComponent } from './projects-components/project-create/project-create.component';
import { ProjectEditComponent } from './projects-components/project-edit/project-edit.component';
import { SelectedProjectsService } from './../services/selected-project.service';
import { SearchProjectsService } from './../services/search-projects.service';
import { ProjectsService } from './../services/projects.service';
import { SignupComponent } from './signup/signup.component';
import { HttpService } from './../services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { LoginComponent } from './login/login.component';

import {
    MatButtonModule,
    MatInputModule,
    MatDialog,
    MatDialogRef,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListItem,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionModule,
    MatDividerModule,
    MatDivider,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonToggle,
    MatButtonToggleModule,
    MatPaginatorModule,
} from '@angular/material';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { SidenavService } from '../services/sidenav.service';
import { SerachTasksService } from '../services/serach-tasks.service';
import { TasksComponent } from './tasks-components/tasks/tasks.component';
import { ProjectsComponent } from './projects-components/projects/projects.component';
import { TaskEditComponent } from './tasks-components/task-edit/task-edit.component';
import { TaskDeleteComponent } from './tasks-components/task-delete/task-delete.component';
import { ProjectDeleteComponent } from './projects-components/project-delete/project-delete.component';
import { TaskCreateComponent } from './tasks-components/task-create/task-create.component';
import { ProjectComponent } from './projects-components/project/project.component';
import { ProjectDataComponent } from './projects-components/project-data/project-data.component';
import { IsAuthorized } from '../services/is-authorized';



@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        LoginComponent,
        HomeComponent,
        ProjectsComponent,
        ToolbarComponent,
        TaskEditComponent,
        SignupComponent,
        GuestPageComponent,
        ProjectEditComponent,
        TaskDeleteComponent,
        ProjectDeleteComponent,
        TaskCreateComponent,
        ProjectCreateComponent,
        ProjectComponent,
        ProjectDataComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        routing,

        // MATERIAL
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatGridListModule,
        MatExpansionModule,
        MatDividerModule,
        MatSelectModule,
        MatMenuModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatPaginatorModule,
    ],
    providers: [
        TaskService,
        AuthService,
        HttpService,
        IsAuthorized,
        SidenavService,
        ProjectsService,
        SerachTasksService,
        SearchProjectsService,
        SelectedProjectsService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        LoginComponent,
        SignupComponent,
        TaskCreateComponent,
        TaskEditComponent,
        TaskDeleteComponent,
        ProjectsComponent,
        ProjectCreateComponent,
        ProjectEditComponent,
        ProjectDeleteComponent,
    ]
})
export class AppModule { }
