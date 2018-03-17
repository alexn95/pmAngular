import { SearchProjectsService } from './../services/search-projects.service';
import { ProjectsService } from './../services/projects.service';
import { SignupComponent } from './signup/signup.component';
import { HttpService } from './../services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { HttpModule } from "@angular/http";
import { TasksComponent } from './tasks/tasks.component';
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
  MatCheckboxModule
} from '@angular/material';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IsAuthorized } from '../models/is-authorized';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { SidenavService } from '../services/sidenav.service';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { SerachTasksService } from '../services/serach-tasks.service';


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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,

    //MATERIAL
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
    MatCheckboxModule
    
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
