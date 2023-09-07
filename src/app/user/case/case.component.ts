import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { WINDOW } from 'src/app/_services/window.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  cols: any[] = [];

  caseStatusSub: any;
  caseStatus: any;

  cases: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit(): void {
    this.cols=[
      { field: 'name', header: 'Case' },
      { field: 'si', header: 'SI'},
      { field: 'siContact', header: 'SI Contact'},
      { field: 'siEmail', header: 'SI Email'},
      { field: 'createdAt', header: 'Date/Time' },
      { field: 'image', header: 'Image'},
    ];

    this.caseStatusSub = this.route.params.subscribe(
      params => (this.caseStatus = params['status'])
    );

    if(this.caseStatus == 'new') {
      this.userService.getUserCases('new').subscribe(r => {
        this.cases = r.cases;
      })
    } else if(this.caseStatus == 'open') {
      this.userService.getUserCases('open').subscribe(r => {
        this.cases = r.cases;
      })
    } else if(this.caseStatus == 'closed') {
      this.userService.getUserCases('closed').subscribe(r => {
        this.cases = r.cases;
      })
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }

  openImage(url: string) {
    console.log('host', url);
    const w = this.window.open(url, '_blank');
    if(w) {
      w.focus();
    }
  }

  ngOnDestroy() {
    this.caseStatusSub.unsubscribe();
  }

}
