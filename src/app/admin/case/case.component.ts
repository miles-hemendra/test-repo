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
  caseStatus: any

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
      { field: 'user', header: 'Customer' },
      { field: 'userEmail', header: 'Contact'},
      { field: 'userContact', header: 'Email'},
      { field: 'createdAt', header: 'Date/Time' },
      { field: 'image', header: 'Image'},
    ];

    this.caseStatusSub = this.route.params.subscribe(
      params => (this.loadCases(params['status']))
    );
  }

  loadCases(status: string) {
    this.caseStatus = status;
    if(this.caseStatus == 'new') {
      this.userService.getSICases('new').subscribe(r => {
        this.cases = r.cases;
      })
    } else if(this.caseStatus == 'open') {
      this.userService.getSICases('open').subscribe(r => {
        this.cases = r.cases;
      })
    } else if(this.caseStatus == 'closed') {
      this.userService.getSICases('closed').subscribe(r => {
        this.cases = r.cases;
      })
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }

  changeCaseStatus(id: number) {
    if(this.caseStatus == 'new') {
      this.userService.setCaseOpen(id).subscribe(r => {
        if(r.status == 'success') {
          this.loadCases(this.caseStatus);
        }
      })
    } else if(this.caseStatus == 'open') {
      this.userService.setCaseClose(id).subscribe(r => {
        if(r.status == 'success') {
          this.loadCases(this.caseStatus);
        }
      })
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
