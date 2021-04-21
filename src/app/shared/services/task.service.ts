import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { Task } from '../class/task';
import { Filters } from '../class/filters';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private Http: HttpClient, private router: Router) { }
  getTask(body: Filters){
    return this.Http.post(`${environment.urlBase}/Task/getTasks`, body)
    .pipe(
      map((response: any) => {
        return response;
        
      })
    );
  }

  getUsers(){
    return this.Http.post(`${environment.urlBase}/User/getUsersReport`, null)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  
  addTask(body: Task){
    return this.Http.post(`${environment.urlBase}/Task/addTask`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getWeeks(){
    return this.Http.post(`${environment.urlBase}/Task/getWeeks`, null)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateComment(body: Task){
    console.log(body);
    return this.Http.post(`${environment.urlBase}/Task/updateComment`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateStatus(body: Task){
    return this.Http.post(`${environment.urlBase}/Task/updateStatus`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateImage(body: Task){
    return this.Http.post(`${environment.urlBase}/Task/updateImage`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateDueDate(body: Task){
    return this.Http.post(`${environment.urlBase}/Task/updateDueDate`, body)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteTask(idTask: Number){
    return this.Http.post(`${environment.urlBase}/Task/deleteTask`, idTask)
    .pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
