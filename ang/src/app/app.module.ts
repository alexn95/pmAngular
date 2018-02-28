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
  MatSnackBarModule
} from '@angular/material';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';




@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    routing,

    //MATERIAL
    MatButtonModule,
    MatInputModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [TaskService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
