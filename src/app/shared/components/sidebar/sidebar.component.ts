import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public form: FormGroup;
  listMenu: Array<any> = [];
  @Output() name = new EventEmitter();
  nameEmitido = 'Escaner';

  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  nameUser: string;
  wiw: string;
  constructor(private authentication: AuthenticationService, private auth: AuthorizationService, config: NgbDropdownConfig, public dialog: MatDialog, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getMenu();
    this.nameUser = JSON.parse( localStorage.getItem('user'))['NAME'] + " " + JSON.parse( localStorage.getItem('user'))['LAST_NAME'];
    this.wiw = JSON.parse( localStorage.getItem('user'))['WIW'];
    const body = document.querySelector('body');
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  getMenu() {
    this.listMenu.push(
    {
        icon: 'clipboard-list-outline',
        name: 'Pendientes',
        state: 'tasks',
        type: 'link'
      }
    );
    switch (this.authentication.getUser().USER_IDROLE) {
      case 1:
        this.listMenu.push(
          {
            icon: 'account-multiple-plus',
            name: 'Usuarios',
            state: 'users',
            type: 'link'
          },
       
        );
        this.nameEmitido = 'scanner';
        break;
    }
    this.name.emit(this.nameEmitido);
  }

  getName(menu) {
    this.nameEmitido = menu.name;
    this.name.emit(this.nameEmitido);
  }

  newTask(){
    this.router.navigate(['/menu/newTask']);
  }


}

