import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent}
    
];
