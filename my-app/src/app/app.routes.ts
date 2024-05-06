import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: "", component: AuthComponent, title: 'auth'},
    { path: "board", loadComponent: ()=> import('./pages/board/board.component').then((c)=> c.BoardComponent), title: 'board',  canActivate: [authGuard()]},
    { path: "**", component: AuthComponent, title: 'auth', redirectTo: ''}
];
