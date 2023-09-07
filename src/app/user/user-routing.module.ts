import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseComponent } from './case/case.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InitSetupComponent } from './init-setup/init-setup.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'init-setup/:step', component: InitSetupComponent },
  { path: 'cases/:status', component: CaseComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
