import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [MessageService]
})
export class CustomerComponent implements OnInit {

  cols: any[] = [];

  users: any[] = [];

  showEditCustomerDialog: boolean = false;
  customerForm!: FormGroup;
  states: any[] = [];
  customerFormSubmitted: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'contact', header: 'Contact' },
      { field: 'email', header: 'E-mail' },
      { field: 'address', header: 'Address' },
    ]

    this.getUsers();

    this.states = [
      {name: 'Chhattisgarh', value: 'Chhattisgarh'}
    ]

    this.customerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  getUsers() {
    this.userService.getSiUsers().subscribe(r => {
      this.users = r.users;
    })
  }

  openEditCustomerDialog(user: any) {
    console.log('user', user);
    this.customerForm.reset();
    this.customerFormControls['fname'].setValue(user.fname);
    this.customerFormControls['lname'].setValue(user.lname);
    this.customerFormControls['contact'].setValue(user.contact);
    this.customerFormControls['email'].setValue(user.email);
    this.customerFormControls['address'].setValue(user.address);
    this.customerFormControls['city'].setValue(user.city);
    this.customerFormControls['state'].setValue(user.state);
    this.customerFormControls['pincode'].setValue(user.pincode);
    this.showEditCustomerDialog = true;
  }

  submitCustomerForm(formData: any) {
    Object.keys(this.customerFormControls).forEach(key => {
      this.customerFormControls[key].markAsDirty();
    });
    this.customerFormSubmitted = true;
    if(this.customerForm.valid) {
      this.userService.editUser(formData).subscribe(r => {
        if(r.status == 'success') {
          this.showEditCustomerDialog = false;
          this.getUsers();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Customer updated successfully.'});
        }
      }, err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
      })
    }
  }

  get customerFormControls() { return this.customerForm.controls }

}
