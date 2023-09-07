import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  profileComplete: boolean = true;
  
  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
    let userDetails = this.tokenService.getUser();
    console.log('user', userDetails)
    let initRoute = '';
    if(!userDetails.si) {
      initRoute = '/user/init-setup/si';
      this.profileComplete = false;
    } else if(!userDetails.email) {
      initRoute = '/user/init-setup/pi';
      this.profileComplete = false;
    } else if(!userDetails.cameras.length) {
      initRoute = '/user/init-setup/camera';
      this.profileComplete = false;
    } else if(!userDetails.plan) {
      initRoute = 'user/init-setup/plan';
      this.profileComplete = false;
    }

    if(!this.profileComplete) {
      this.router.navigate([initRoute]);
    }
  }

  ngOnInit(): void {
    this.userService.getUserDashboardData().subscribe(data => {
      console.log('dashCounts', data);
      this.dashboardData = data;
    })
  }

}
