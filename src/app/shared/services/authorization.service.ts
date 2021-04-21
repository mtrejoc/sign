import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {
  private PERMISSION: string[] = [];

  constructor(public router: Router, private auth: AuthenticationService) {
    this.GetPermissions();
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

     const component: string = next.routeConfig.path;
     const index: number = this.PERMISSION.indexOf(component);

     this.getMenu(this.auth.getUser()['USER_IDROLE']);

    if (this.auth.getUser()['USER_IDROLE']) {
          // check if route is restricted by role
          if (index >= 0 || component === '') {
            return true;
          } else {
            this.router.navigate(['menu/tasks']);
            return false;
          }
          // authorised so return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login']);
    return false;
    }
  
    getMenu(RolUser: number) {
      let ruta: string;
      let permission: string[] = [];
  
      switch (RolUser) {
        case 1:
          permission = ['users', 'tasks', 'newTask'];
          ruta = 'menu/tasks';
          this.SetPermission(permission);
          break;
        case 5:
          permission = ['tasks', 'newTask'];
          ruta = 'menu/tasks';
          this.SetPermission(permission);
          break;
      }
      return ruta;
    }

    SetPermission(permission: string[]) {
      this.PERMISSION = permission;
      localStorage.setItem('data-permission', JSON.stringify(this.PERMISSION));
    }

    GetPermissions() {
      if (localStorage.getItem('data-permission')) {
        this.PERMISSION = JSON.parse(localStorage.getItem('data-permission'));
      } else {
        this.PERMISSION = [];
      }
      return this.PERMISSION;
    }
}
