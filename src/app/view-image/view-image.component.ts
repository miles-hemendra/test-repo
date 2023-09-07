import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {

  imageIdSub: any;
  imageId: any;

  path: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.imageIdSub = this.route.params.subscribe(
      params => (this.imageId = params['id'])
    );

    this.userService.getImagePath(this.imageId).subscribe(path => {
      this.path = path.path;
    })
  }

}
