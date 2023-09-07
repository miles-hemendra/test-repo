import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: any;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSIDashboardData().subscribe(data => {
      console.log('dashCounts', data);
      this.dashboardData = data;
    })
  }

}
