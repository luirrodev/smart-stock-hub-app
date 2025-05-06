import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';

export const appRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'access-control', loadChildren: () => import('./app/modules/access_control/access-control.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    {
        path: 'auth',
        canActivate: [redirectGuard],
        loadChildren: () => import('./app/modules/auth/auth.routes')
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
