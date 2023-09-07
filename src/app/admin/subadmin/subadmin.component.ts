import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

import { MessageService}  from 'primeng/api';

@Component({
  selector: 'app-subadmin',
  templateUrl: './subadmin.component.html',
  styleUrls: ['./subadmin.component.scss'],
  providers: [MessageService]
})
export class SubadminComponent implements OnInit {

  allSubadmin: any;
  cols: any[] = [];

  showAddSubadminDialog: boolean = false;

  subadminForm!: FormGroup;
  states: any[] = [];

  subadminFormSubmitted: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cols=[
      { field: 'name', header: 'Name' },
      { field: 'contact', header: 'Contact' },
      { field: 'email', header: 'E-mail' },
      { field: 'address', header: 'Address' },
    ];

    this.states = [
      {name: 'Chhattisgarh', value: 'Chhattisgarh'}
    ]

    this.userService.getAllSubadmin().subscribe(allSi => {
      console.log('all-subadmin', allSi);
      this.allSubadmin = allSi;
    });

    this.subadminForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    }, {
      validator: this.checkContactAndEmail()
    });
  }

  checkContactAndEmail() {
    return (formGroup: FormGroup) => {
      const email = formGroup.controls['email'];
      const contact = formGroup.controls['contact'];
      this.userService.checkContactExists(contact.value).subscribe(contactExists => {
        this.userService.checkEmailExists(email.value).subscribe(emailExists => {
          if (contact.errors && !contact.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
          }

          if (email.errors && !email.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
          }

          // set error on matchingControl if validation fails
          if (contactExists.status == 'exists') {
            contact.setErrors({ exists: true });
          } else {
            contact.setErrors(null);
          }

          // set error on matchingControl if validation fails
          if (emailExists.status == 'exists') {
            email.setErrors({ exists: true });
          } else {
            email.setErrors(null);
          }
        })
      })
    }
  }

  addSubadmin() {
    this.subadminForm.reset();
    this.subadminFormSubmitted = false;
    this.showAddSubadminDialog = true;
  }

  submitSubadminForm(formData: any) {
    Object.keys(this.subadminFormControls).forEach(key => {
      this.subadminFormControls[key].markAsDirty();
    });
    this.subadminFormSubmitted = true;
    if(this.subadminForm.valid) {
      this.userService.addSubadmin(formData).subscribe(r => {
        if(r.status == 'success') {
          this.showAddSubadminDialog = false;
          this.allSubadmin.unshift(r.subadmin)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Subadmin added successfully.'});
        }
      }, err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
      })
    }
  }

  get subadminFormControls() { return this.subadminForm.controls }

}
