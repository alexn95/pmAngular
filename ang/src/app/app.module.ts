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
  MatSelectModule
} from '@angular/material';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IsAuthorized } from '../models/is-authorized';
import { PermissionErrorComponent } from './permission-error/permission-error.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { ModalService } from '../services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent,
    ToolbarComponent,
    PermissionErrorComponent,
    TaskEditComponent,
    SignupComponent
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
    
  ],
  providers: [TaskService, AuthService, ModalService, HttpService, IsAuthorized],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    SignupComponent,
    TaskEditComponent
  ]
})
export class AppModule { }
