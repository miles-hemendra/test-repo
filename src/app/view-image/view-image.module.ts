import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewImageRoutingModule } from './view-image-routing.module';
import { ViewImageComponent } from './view-image.component';


@NgModule({
  declarations: [
    ViewImageComponent
  ],
  imports: [
    CommonModule,
    ViewImageRoutingModule
  ]
})
export class ViewImageModule { }
