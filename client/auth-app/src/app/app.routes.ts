import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: RegisterComponent}
];
