import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'menu/tasks', redirectTo: '/menu/tasks', pathMatch: 'full'},
  { path: 'menu/newTask', redirectTo: '/menu/newTask', pathMatch: 'full'},
  { path: 'menu/users', redirectTo: '/menu/users', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
