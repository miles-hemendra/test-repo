import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

import { MessageService}  from 'primeng/api';

@Component({
  selector: 'app-si',
  templateUrl: './si.component.html',
  styleUrls: ['./si.component.scss'],
  providers: [MessageService]
})
export class SiComponent implements OnInit {

  allSI: any;
  cols: any[] = [];

  showAddSIDialog: boolean = false;

  siForm!: FormGroup;
  states: any[] = [];

  siFormSubmitted: boolean = false;

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

    this.userService.getAllSI().subscribe(allSi => {
      console.log('all-si', allSi);
      this.allSI = allSi;
    });

    this.siForm = this.fb.group({
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

  addSI() {
    this.siForm.reset();
    this.siFormSubmitted = false;
    this.showAddSIDialog = true;
  }

  submitSIForm(formData: any) {
    Object.keys(this.siFormControls).forEach(key => {
      this.siFormControls[key].markAsDirty();
    });
    this.siFormSubmitted = true;
    if(this.siForm.valid) {
      this.userService.addSI(formData).subscribe(r => {
        if(r.status == 'success') {
          this.showAddSIDialog = false;
          this.allSI.unshift(r.si)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'SI added successfully.'});
        }
      }, err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
      })
    }
  }

  get siFormControls() { return this.siForm.controls }

}
