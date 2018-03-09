
import { IsAuthorized } from './../models/is-authorized';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate : [IsAuthorized],
  },

];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);