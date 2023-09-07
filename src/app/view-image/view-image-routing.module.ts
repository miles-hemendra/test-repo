import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewImageComponent } from './view-image.component';

const routes: Routes = [{ path: ':id', component: ViewImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewImageRoutingModule { }
