import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
    { path: "", component: AuthComponent, title: 'auth'},
    { path: "board", component: BoardComponent, title: 'board'},
    { path: "**", component: AuthComponent, title: 'auth', redirectTo: ''}
];
