import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';7

import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { ContentAnimateDirective } from './shared/components/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { LoginComponent } from './login/login.component';



import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { MenuModule } from '../app/layout/menu.module';


import { DataTablesModule } from "angular-datatables";
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/showTasks/tasks.component';
import { NewTaskComponent } from './tasks/newTask/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    ContentAnimateDirective,
    LoginComponent,
    UsersComponent,
    TasksComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    MaterialModule,
    MenuModule,
    MatNativeDateModule,
    DataTablesModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
