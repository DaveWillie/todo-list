import { Routes } from '@angular/router';

import { TodolistComponent } from '../components/todolist/todolist.component';

export const routes: Routes = [
  { path: 'home', component: TodolistComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
