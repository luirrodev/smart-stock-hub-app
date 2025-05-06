import { Routes } from '@angular/router';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';

export default [
    { path: 'roles', component: RolesComponent },
    { path: 'users', component: UsersComponent }
] as Routes;
