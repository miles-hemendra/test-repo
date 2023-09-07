import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

// Primeng Imports
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    HeaderComponent,
    LoginSignupComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MenubarModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    RippleModule,
    DropdownModule,
    ToastModule
  ]
})
export class LandingModule { }
