import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/pages/login-page/login-page.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./login/pages/register-page/register-page.component')
    },


    {
        path: '**',
        redirectTo: 'login'
    }
];
