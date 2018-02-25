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
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    //MATERIAL
    MatButtonModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
