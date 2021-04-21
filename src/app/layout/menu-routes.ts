import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from 'src/app/layout/full/full.component';
import {AuthorizationService } from '../shared/services/authorization.service';
import { UsersComponent } from '../users/users.component';
import { TasksComponent } from '../tasks/showTasks/tasks.component';
import { NewTaskComponent } from '../tasks/newTask/new-task/new-task.component';







const MENU_ROUTES: Routes = [
    {
        path: 'menu',
        component: FullComponent,
        children: [
            {
                path: 'tasks',
                component: TasksComponent,
                canActivate: [AuthorizationService]
            },
            {
                path: 'newTask',
                component: NewTaskComponent,
                canActivate: [AuthorizationService]
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthorizationService]
            }

        ]
    }
];
export const ROUTES = RouterModule.forChild(MENU_ROUTES);
