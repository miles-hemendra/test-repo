import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/_services/token.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
  providers: [MessageService]
})
export class LoginSignupComponent implements OnInit {

  showLoginDialog: boolean = false;
  otpLogin: boolean = false;
  otpSent: boolean = false;
  showResend: boolean = false;
  resendSecCount: number = 30;
  invalidLogin: boolean = false;
  invalidOtp: boolean = false;

  loginForm!: FormGroup;
  otpForm!: FormGroup;

  otpFormSubmitted: boolean = false;
  loginFormSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.otpForm = this.fb.group({
      contact: ['', Validators.required],
      otp: ['']
    })
  }

  openLoginDialog() {
    this.loginForm.reset();
    this.otpForm.reset();
    this.otpFormSubmitted = false;
    this.loginFormSubmitted = false;
    this.otpLogin = false;
    this.showLoginDialog = true;
  }

  submitLoginForm(formData: any) {
    Object.keys(this.loginFormControls).forEach(key => {
      this.loginFormControls[key].markAsDirty();
    });
    this.loginFormSubmitted = true;
    if(this.loginForm.valid) {
      this.authService.login(formData.contact, formData.password).subscribe(r => {
        if(r.accessToken) {
          this.tokenService.saveToken(r.accessToken);
          this.tokenService.saveUser(r);
          let role = this.tokenService.getUser().role;
          console.log('role', role);
          if(role == 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if( role == 'ROLE_SI') {
            this.router.navigate(['/si']);
          } else if(role == 'ROLE_USER') {
            this.router.navigate(['/user']);
          }
        } else {
          this.invalidLogin = true;
        }
      }, err => {
        this.invalidLogin = true;
      })
    }
  }

  submitOtpForm(formData: any) {
    Object.keys(this.otpFormControls).forEach(key => {
      this.otpFormControls[key].markAsDirty();
    });
    this.otpFormSubmitted = true;
    if(this.otpForm.valid) {
      if(this.otpSent) {
        this.authService.loginUsingOTP(formData.contact, formData.otp.split('-').join('')).subscribe(r => {
          if(r.accessToken) {
            this.tokenService.saveToken(r.accessToken);
            this.tokenService.saveUser(r);
            let role = this.tokenService.getUser().role;
            console.log('role', role);
            if(role == 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if( role == 'ROLE_SI') {
              this.router.navigate(['/si']);
            } else if(role == 'ROLE_USER') {
              this.router.navigate(['/user']);
            }
          } else {
            this.invalidOtp = true;
          }
        }, err => {
          this.invalidOtp = true;
        })
      } else {
        this.authService.sendOTP(formData.contact).subscribe(r => {
          console.log('rrrr', r);
          if(r.status == 'success') {
            this.otpSent = true;
            this.otpFormSubmitted = false;
            this.otpFormControls.otp.setValidators([Validators.required]);
            this.otpFormControls.otp.updateValueAndValidity();
            this.startResendOtpTimer();
          }
        })
      }
    }
  }

  startResendOtpTimer() {
    this.showResend = false;
    this.resendSecCount = 30;
    var resendTimer = setInterval(() => {
      this.resendSecCount--;
    }, 1000);
    setTimeout(() => {
      clearInterval(resendTimer);
      this.showResend = true;
    }, 30000);
  }

  resendOTP(formData: any) {
    this.authService.sendOTP(formData.contact).subscribe(r => {
      console.log('rrrr', r);
      if(r.status == 'success') {
        this.startResendOtpTimer();
      }
    })
  }

  get loginFormControls() { return this.loginForm.controls; }
  get otpFormControls() { return this.otpForm.controls; }

}
