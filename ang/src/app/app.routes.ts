import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
];

export const routing = RouterModule.forRoot(routes);