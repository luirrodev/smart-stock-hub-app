import { Routes } from '@angular/router';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';
import { authGuard } from '@guards/auth.guard';

export default [
    { path: 'roles', canActivate: [authGuard], component: RolesComponent },
    { path: 'users', canActivate: [authGuard], component: UsersComponent }
] as Routes;
