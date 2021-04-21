import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Login } from 'src/app/shared/class/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public userLogin: Login;
  error: boolean = false;
  message: string;
  constructor(private fb: FormBuilder, private router: Router,  private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  OnLogin() {
    if (this.form.valid) {
      this.userLogin = new Login();
      this.userLogin.idApp = 82;
      this.userLogin.WIW = this.form.controls.uname.value.toUpperCase().trim();
      this.userLogin.PWD = this.form.controls.password.value.trim();
      this.authentication.doLogin(this.userLogin).subscribe(
        (data) => {
          if(data.STATUS === "DONE"){
            this.authentication.setUser(data);
            this.router.navigate(['/menu/tasks']);
          } else {
            this.error = true;
            this.message = data.STATUS;
          }
        }
      );
      
    }
  }

}
