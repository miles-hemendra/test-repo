import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamerasComponent } from './cameras/cameras.component';
import { CaseComponent } from './case/case.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DvrsComponent } from './dvrs/dvrs.component';
import { PlansComponent } from './plans/plans.component';
import { SiComponent } from './si/si.component';
import { SubadminComponent } from './subadmin/subadmin.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent 
  },
  {
    path: 'manage-subadmin',
    component: SubadminComponent 
  },
  {
    path: 'manage-si',
    component: SiComponent 
  },
  {
    path: 'manage-cameras',
    component: CamerasComponent 
  },
  {
    path: 'manage-dvrs',
    component: DvrsComponent 
  },
  {
    path: 'manage-plans',
    component: PlansComponent 
  },
  { path: 'cases/:status',
    component: CaseComponent
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
