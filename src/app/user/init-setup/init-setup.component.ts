import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserService } from 'src/app/_services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/_services/token.service';

import { MenuItem } from 'primeng/api';
import { MessageService}  from 'primeng/api';
import { PlanService } from 'src/app/_services/plan.service';
import { DvrService } from 'src/app/_services/dvr.service';
import { CameraService } from 'src/app/_services/camera.service';

@Component({
  selector: 'app-init-setup',
  templateUrl: './init-setup.component.html',
  styleUrls: ['./init-setup.component.scss'],
  providers: [MessageService]
})
export class InitSetupComponent implements OnInit {

  steps: MenuItem[] = [];

  currUser: any;

  currStepSub: any;
  currStep: any;

  selectedSI: any;
  filteredSI: any;

  siForm!: FormGroup;
  siFormSubmitted: boolean = false;

  piForm!: FormGroup;
  piFormSubmitted: boolean = false;
  states: any[] = [];
  
  cameraForm!: FormGroup;
  cameraFormSubmitted: boolean = false;
  cameras: any[] = [];
  dvrs: any[] = [];

  planForm!: FormGroup;
  planFormSubmitted: boolean = false;
  passwordMatch: boolean = false;
  plans: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private messageService: MessageService,
    private planService: PlanService,
    private cameraService: CameraService,
    private dvrService: DvrService
  ) { }

  ngOnInit(): void {
    this.steps = [
      {
        label: 'SI',
        routerLink: '/user/init-setup/si'
      },
      {
        label: 'Personal Information',
        routerLink: '/user/init-setup/pi'
      },
      {
        label: 'Camera Information',
        routerLink: '/user/init-setup/camera'
      },
      {
        label: 'Plan Information',
        routerLink: '/user/init-setup/plan'
      }
    ];

    this.currStepSub = this.route.params.subscribe(
      params => (this.currStep = params['step'])
    );

    this.currUser = this.tokenService.getUser();

    this.siForm = this.fb.group({
      selectedSI: ['', Validators.required],
    });

    this.piForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      contact: [this.currUser.contact, Validators.required],
      email: ['', Validators.required],
      telegramUsername: [''],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    }, {
      validator: this.checkPasswordAndEmail()
    });

    this.cameraForm = this.fb.group({
      camera: ['', Validators.required],
      cameraCount: ['', Validators.required],
      dvr: ['', Validators.required],
      dvrCount: ['', Validators.required],
    });

    this.planForm = this.fb.group({
      selectedPlan: ['', Validators.required],
    });

    if(this.currUser.si) {
      this.siFormControls.selectedSI.setValue(this.currUser.si);
    }

    if(this.currUser.email) {
      this.piFormControls.fname.setValue(this.currUser.fname);
      this.piFormControls.lname.setValue(this.currUser.lname);
      this.piFormControls.email.setValue(this.currUser.email);
      this.piFormControls.address.setValue(this.currUser.address);
      this.piFormControls.city.setValue(this.currUser.city);
      this.piFormControls.state.setValue(this.currUser.state);
      this.piFormControls.pincode.setValue(this.currUser.pincode);
    }

    if(this.currUser.camera) {
      this.cameraFormControls.camera.setValue(this.currUser.cameras[0]);
      this.cameraFormControls.cameraCount.setValue(this.currUser.cameras[0].cameraCount);
      this.cameraFormControls.dvr.setValue(this.currUser.dvrs[0]);
      this.cameraFormControls.dvrCount.setValue(this.currUser.dvrs[0].dvrCount);
    }

    if(this.currUser.plan) {
      this.router.navigate(['/user/dashboard']);
    }

    this.states = [
      {name: 'Chhattisgarh', value: 'Chhattisgarh'}
    ]

    this.planService.getAllPlans().subscribe(plans => {
      this.plans = plans;
    })

    this.cameraService.getAllCameras().subscribe(cameras => {
      this.cameras = cameras;
    })

    this.dvrService.getAllDvrs().subscribe(dvrs => {
      this.dvrs = dvrs;
    })

    setTimeout(() => {
      this.piFormControls['telegramUsername'].setValue('');
      this.piFormControls['password'].setValue('');
      this.piFormControls['password'].markAsUntouched();
      this.piFormControls['password'].markAsPristine();
    }, 800)
  }

  filterSI(e: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = e.query;

    this.userService.getAllSI().subscribe(allSI =>{
      for(let i = 0; i < allSI.length; i++) {
        allSI[i].name = allSI[i].fname + ' ' + allSI[i].lname;
        if (allSI[i].name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(allSI[i]);
        }
      }
      this.filteredSI = filtered;
    })
  }

  submitSIForm(formData: any) {
    Object.keys(this.siFormControls).forEach(key => {
      this.siFormControls[key].markAsDirty();
    });
    this.siFormSubmitted = true;
    if(this.siForm.valid) {
      this.userService.setUserSI(formData.selectedSI.contact).subscribe(r => {
        if(r.contact) {
          r.accessToken = this.tokenService.getToken();
          this.tokenService.saveUser(r)
          this.router.navigate(['/user/init-setup/pi']);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'SI updated successfully.'});
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
        }
      })
    }
  }

  // passwordValidator(fg: FormControl) {
  //   // console.log('iii', control);
  //   console.log('ppp', this.piFormControls);
  //   // if(this.piFormControls.password.value === this.piFormControls.confirm_password.value) {
  //   //   console.log('innnnnnnnnn');
  //   //   this.passwordMatch = true;
  //   //   return null;
  //   // } else {
  //   //   this.passwordMatch = false;
  //   //   return null;
  //   // }
  // }

  checkPasswordAndEmail() {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls['password'];
      const confirmPassword = formGroup.controls['confirm_password'];
      const email = formGroup.controls['email'];
      this.userService.checkEmailExists(email.value).subscribe(emailExists => {
        if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
          // return if another validator has already found an error on the confirmPassword
          return;
        }

        if (email.errors && !email.errors.exists) {
          // return if another validator has already found an error on the confirmPassword
          return;
        }

        // set error on confirmPassword if validation fails
        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({ mustMatch: true });
        } else {
            confirmPassword.setErrors(null);
        }

        // set error on confirmPassword if validation fails
        if (emailExists.status == 'exists') {
          email.setErrors({ exists: true });
        } else {
          email.setErrors(null);
        }
      });
    }
  }

  submitPIForm(formData: any) {
    Object.keys(this.piFormControls).forEach(key => {
      this.piFormControls[key].markAsDirty();
    });
    this.piFormSubmitted = true;
    if(this.piForm.valid) {
      this.userService.setUserPI(formData).subscribe(r => {
        if(r.contact) {
          r.accessToken = this.tokenService.getToken();
          this.tokenService.saveUser(r)
          this.router.navigate(['/user/init-setup/camera']);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Personal Information updated successfully.'});
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
        }
      })
    }
  }

  submitCameraForm(formData: any) {
    Object.keys(this.cameraFormControls).forEach(key => {
      this.cameraFormControls[key].markAsDirty();
    });
    this.cameraFormSubmitted = true;
    if(this.cameraForm.valid) {
      this.userService.setUserCamera(formData).subscribe(r => {
        if(r.contact) {
          r.accessToken = this.tokenService.getToken();
          this.tokenService.saveUser(r)
          this.router.navigate(['/user/init-setup/plan']);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Camera Information updated successfully.'});
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
        }
      })
    }
  }

  submitPlanForm(formData: any) {
    Object.keys(this.planFormControls).forEach(key => {
      this.planFormControls[key].markAsDirty();
    });
    this.cameraFormSubmitted = true;
    if(this.planForm.valid) {
      this.userService.setUserPlan(formData).subscribe(r => {
        if(r.contact) {
          r.accessToken = this.tokenService.getToken();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Profile updated successfully.'});
          this.tokenService.saveUser(r)
          this.router.navigate(['/user/dashboard']);
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
        }
      })
    }
  }

  goBack(step: string) {
    this.router.navigate(['/user/init-setup/'+step]);
  }

  ngOnDestroy() {
    this.currStepSub.unsubscribe();
  }

  get siFormControls() { return this.siForm.controls; }
  get piFormControls() { return this.piForm.controls; }
  get cameraFormControls() { return this.cameraForm.controls; }
  get planFormControls() { return this.planForm.controls; }
}
