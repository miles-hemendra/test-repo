import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SiRoutingModule } from './si-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CaseComponent } from './case/case.component';
import { CustomerComponent } from './customer/customer.component';

// Primeng Imports
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CaseComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    SiRoutingModule,
    MenubarModule,
    CardModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class SiModule { }
