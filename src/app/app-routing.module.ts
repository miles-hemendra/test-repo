import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './_services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGaurdService], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  },
  {
    path: 'si',
    loadChildren: () => import('./si/si.module').then(m => m.SiModule),
    canActivate: [AuthGaurdService], 
    data: { 
      expectedRole: 'ROLE_SI'
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGaurdService], 
    data: { 
      expectedRole: 'ROLE_USER'
    }
  },
  { 
    path: 'view-image',
    loadChildren: () => import('./view-image/view-image.module').then(m => m.ViewImageModule)
  },
  { 
    path: 'sub-admin',
    loadChildren: () => import('./sub-admin/sub-admin.module').then(m => m.SubAdminModule),
    canActivate: [AuthGaurdService], 
    data: { 
      expectedRole: 'ROLE_SUBADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
