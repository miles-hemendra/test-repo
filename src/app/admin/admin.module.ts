import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CamerasComponent } from './cameras/cameras.component';
import { DvrsComponent } from './dvrs/dvrs.component';
import { PlansComponent } from './plans/plans.component';
import { SiComponent } from './si/si.component';

// Primeng Imports
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { CaseComponent } from './case/case.component';
import { SubadminComponent } from './subadmin/subadmin.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    CamerasComponent,
    DvrsComponent,
    PlansComponent,
    SiComponent,
    CaseComponent,
    SubadminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    CardModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    InputMaskModule
  ]
})
export class AdminModule { }
