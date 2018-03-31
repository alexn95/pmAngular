import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorized } from '../services/is-authorized';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [IsAuthorized],
    },

];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
