import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { User } from '../class/user';
import { map } from 'rxjs/operators';
import { UserAccess } from '../class/userAccess';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private Http: HttpClient, private router: Router) { }

  getUsers(){
    let params = new HttpParams();
    params = params.append('idApp', '82');
    return this.Http.get<any>(`${environment.urlLogin}User/GetADUsers`, {params: params});
  }
  //test
  // getRoles(){
  //   return this.Http.get<any>(`${environment.urlLogin}User/GetRoles`)
  // }


  //prod
  getRoles(){
    return this.Http.post<any>(`${environment.urlLogin}ControlUsr/GetRoles`, null)   
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  addUser(body: UserAccess){
    return this.Http.post(`${environment.urlLogin}User/InsertUserAccess`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteUser(body: UserAccess){
    return this.Http.post(`${environment.urlLogin}User/DeleteUserAccess`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
