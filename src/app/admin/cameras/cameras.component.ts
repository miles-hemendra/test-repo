import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from 'src/app/_services/camera.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

  cols: any[] = [];
  cameras: any[] = [];

  displayAddEditCameraDialog: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cols=[
      { field: 'name', header: 'Name' },
    ];

    this.loadCameras()
  }

  loadCameras() {
    this.cameraService.getAllCameras().subscribe(cameras => {
      this.cameras = cameras;
    })
  }

  showAddCameraDialog() {
    this.displayAddEditCameraDialog = true;
  }

}
