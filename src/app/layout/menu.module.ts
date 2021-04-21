import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullComponent } from '../layout/full/full.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

import { ROUTES } from './menu-routes';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';



@NgModule({
  declarations: [FullComponent, NavbarComponent,SidebarComponent,FooterComponent, SpinnerComponent],
  imports: [
    CommonModule,
    ROUTES,
    MaterialModule
  ],
  exports: [
    FullComponent

  ]
})
export class MenuModule { }