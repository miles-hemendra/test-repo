import { Component, OnInit, ViewChild } from '@angular/core';

import { TokenService } from 'src/app/_services/token.service';

import { LoginSignupComponent } from '../login-signup/login-signup.component';

// Primeng Imports
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  @ViewChild('loginSignup') loginSignup!: LoginSignupComponent;

  isLoggedIn: boolean = false;
  
  user: any;
  
  profileForm!: FormGroup;
  profileFormSubmitted: boolean = false;
  showProfileDialog: boolean = false;

  states: any[] = [];

  passwordForm!: FormGroup;
  passwordFormSubmitted: boolean = false;
  showPasswordDialog: boolean = false;

  contactForm!: FormGroup;
  contactFormSubmitted: boolean = false;
  showContactDialog: boolean = false;
  otpSent: boolean = false;
  invalidOTP: boolean = false;
  showResend: boolean = false;
  resendSecCount: number = 30;

  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.user = this.tokenService.getUser();
    }
  }

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label:'Home'
      },
      {
        label:'About Us'
      },
      {
        label:'Features'
      },
      {
        label:'Clients'
      },
      {
        label:'Contact Us'
      },
    ]

    if(this.isLoggedIn && this.user) {
      let route = this.user.role == 'ROLE_ADMIN' ? 'admin' : (this.user.role == 'ROLE_SI' ? 'si' : (this.user.role == 'ROLE_USER' ? 'user' : ''))
      this.items.push({
        label: this.user.fname,
        icon: 'pi pi-user',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-credit-card',
            routerLink: route
          },
          {
            label: 'Profile',
            icon: 'pi pi-user-edit',
            command: this.editProfile.bind(this)
          },
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: this.logout.bind(this)
          }
        ]
      })
    } else {
      this.items.push({
        label: 'Login',
        command: this.openLogin.bind(this)
      })
    }

    this.states = [
      {name: 'Chhattisgarh', value: 'Chhattisgarh'}
    ]

    if(this.user) {
      this.profileForm = this.fb.group({
        fname: [this.user.fname, Validators.required],
        lname: [this.user.lname, Validators.required],
        contact: [this.user.contact, Validators.required],
        email: [this.user.email, Validators.required],
        address: [this.user.address, Validators.required],
        city: [this.user.city, Validators.required],
        state: [{name: this.user.state, value: this.user.state}, Validators.required],
        pincode: [this.user.pincode, Validators.required],
      }, {
        validator: this.checkEmail()
      });

      this.passwordForm = this.fb.group({
        currPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      }, {
        validator: this.MustMatch()
      });
  
      this.contactForm = this.fb.group({
        contact: ['', Validators.required],
        otp: ['']
      }, {
        validator: this.checkContact()
      });
    }
  }

  openLogin() {
    this.loginSignup.showLoginDialog = true;
  }

  editProfile() {
    this.showProfileDialog = true;
  }

  submitProfileForm(formData: any) {
    Object.keys(this.profileFormControls).forEach(key => {
      this.profileFormControls[key].markAsDirty();
    });
    this.profileFormSubmitted = true;
    if(this.profileForm.valid) {
      this.userService.updateProfile(formData).subscribe(r => {
        if(r.contact) {
          r.accessToken = this.tokenService.getToken();
          this.tokenService.saveUser(r);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Profile updated successfully.'});
          this.showProfileDialog = false;
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
        }
      })
    }
  }

  editContact() {
    this.contactForm.reset();
    this.contactFormSubmitted = false;
    this.showContactDialog = true;
  }

  changePassword() {
    this.passwordForm.reset();
    this.passwordFormSubmitted = false;
    this.showPasswordDialog = true;
  }

  checkEmail() {
    return (formGroup: FormGroup) => {
      const email = formGroup.controls['email'];
      this.userService.checkEmailExists(email.value).subscribe(emailExists => {
        if (email.errors && !email.errors.exists) {
          // return if another validator has already found an error on the matchingControl
          return;
        }

        if(emailExists.status == 'exists') {
          email.setErrors({exists: true});
        } else {
          email.setErrors(null);
        }
      })
    }
  }

  MustMatch() {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls['newPassword'];
      const confirmPassword = formGroup.controls['confirmNewPassword'];
      const currPassword = formGroup.controls['currPassword'];
      console.log('curr--> ', currPassword)
      console.log('new--> ', password)
      console.log('confirm--> ', currPassword)
      this.userService.checkCurrPassword(currPassword.value).subscribe(validCurrPassword => {
        console.log('rrrr--->> ', validCurrPassword);
        if (confirmPassword.errors && !confirmPassword.errors.mustMatch) {
          // return if another validator has already found an error on the confirmPassword
          return;
        }

        if (currPassword.errors && !currPassword.errors.mustMatch) {
          // return if another validator has already found an error on the confirmPassword
          return;
        }

        // set error on confirmPassword if validation fails
        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({ mustMatch: true });
        } else {
          confirmPassword.setErrors(null);
        }

        // set error on currControl if validation fails
        if (validCurrPassword.status == 'match') {
          currPassword.setErrors(null);
        } else {
          currPassword.setErrors({ mustMatch: true });
        }
      })
    }
  }

  checkContact() {
    return (formGroup: FormGroup) => {
      const contact = formGroup.controls['contact'];
      this.userService.checkContactExists(contact.value).subscribe(contactExists => {
        if (contact.errors && !contact.errors.exists) {
          // return if another validator has already found an error on the matchingControl
          return;
        }

        if(contactExists.status == 'exists') {
          contact.setErrors({exists: true});
        } else {
          contact.setErrors(null);
        }
      })
    }
  }

  submitPasswordForm(formData: any) {
    Object.keys(this.passwordFormControls).forEach(key => {
      this.passwordFormControls[key].markAsDirty();
    });
    this.passwordFormSubmitted = true;
    if(this.passwordForm.valid) {
      this.userService.updatePassword(formData.newPassword).subscribe(r => {
        if(r.status == 'success') {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Password updated successfully.'});
          this.showPasswordDialog = false;
        }
      })
    }
  }

  submitContactForm(formData: any) {
    Object.keys(this.contactFormControls).forEach(key => {
      this.contactFormControls[key].markAsDirty();
    });
    this.contactFormSubmitted = true;
    if(this.contactForm.valid) {
      if(this.otpSent) {
        this.userService.updateContact(formData.contact, formData.otp.split('-').join('')).subscribe(r => {
          if(r.contact) {
            r.accessToken = this.tokenService.getToken();
            this.tokenService.saveUser(r);
            this.profileFormControls.contact.setValue(formData.contact);
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Contact updated successfully.'});
            this.showContactDialog = false;
          } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong. Please try again!'});
          }
        }, err => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Wrong OTP or contact number mismatched. Please try again!'});
          this.showContactDialog = false;
        })
      } else {
        this.userService.sendOTPForContactUpdate(formData.contact).subscribe(r => {
          console.log('rrrr', r);
          if(r.status == 'success') {
            this.otpSent = true;
            this.contactFormSubmitted = false;
            this.contactFormControls.otp.setValidators([Validators.required]);
            this.contactFormControls.otp.updateValueAndValidity();
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
    this.userService.sendOTPForContactUpdate(formData.contact).subscribe(r => {
      console.log('rrrr', r);
      if(r.status == 'success') {
        this.startResendOtpTimer();
      }
    })
  }

  get profileFormControls() { return this.profileForm.controls }
  get passwordFormControls() { return this.passwordForm.controls }
  get contactFormControls() { return this.contactForm.controls }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }

}
