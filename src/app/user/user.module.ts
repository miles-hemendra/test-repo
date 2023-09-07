import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { InitSetupComponent } from './init-setup/init-setup.component';
import { CaseComponent } from './case/case.component';

// Primeng Imports
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    InitSetupComponent,
    CaseComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MenubarModule,
    CardModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    ToastModule,
    StepsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
  ]
})
export class UserModule { }
