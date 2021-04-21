import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2'
import { UserAccess } from '../shared/class/userAccess';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public userInfo: UserAccess;
  users: string[] = [];
  roles: string[] = [];
  userForm: FormGroup;

  constructor(private user: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.getUsers();

    this.userForm = this.formBuilder.group({
      Id_Employee: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      Id_App: [82, Validators.required],
      ID_Role: ['', Validators.required]
    });
   
  }

  onSubmit() {
    if(this.userForm.valid){
      this.user.addUser(this.userForm.value).subscribe((data) => { 
        if(data.status == "Success") {
          this.getUsers();
          this.userForm.reset();
          Swal.fire({
            title: 'Success!!',
            text: 'User add correctly',
            icon: 'success',
            confirmButtonText: 'OK'
          })

        } 
      });
    }
  }

  getUsers(){
    this.users = [];
    this.roles = [];
    this.user.getUsers().subscribe((data) => { data.forEach( user => {
      this.users.push(user);
      }); 
    });

    this.user.getRoles().subscribe((data) => { data.Result.forEach( rol => {
      this.roles.push(rol);
      }); 
    });

  }

  deleteUser(WIW: String, IdRole: number){
    this.userInfo = new UserAccess();
    this.userInfo.Id_Employee = WIW.toUpperCase();
    this.userInfo.Id_App = 76;
    this.userInfo.ID_Role = IdRole;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.deleteUser(this.userInfo).subscribe((data) => {
          if(data.status == "Success") {
            this.getUsers();
            Swal.fire({
              title: 'Success!!',
              text: 'User delete correctly',
              icon: 'success',
              confirmButtonText: 'OK'
            })
    
          } 
        });
      }
    });






  

  }
}
