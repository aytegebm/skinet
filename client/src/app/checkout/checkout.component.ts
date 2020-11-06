import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.createCheckoutForm();
    this.getAddessFormValues();
  }

  // tslint:disable-next-line: typedef
  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  }

  // tslint:disable-next-line: typedef
  getAddessFormValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        console.log('Fname ' + address.firstName);
        console.log('Lname ' + address.lastName);
        console.log('street ' + address.street);
        console.log('city ' + address.city);
        console.log('state ' + address.state);
        console.log('zipcode ' + address.zipcode);
        this.checkoutForm.get('addressForm').patchValue(address);

        // this.checkoutForm.get('addressForm').patchValue({
        //   firstName: address.firstName,
        //   lastName: address.lastName
        //   });
      }

    }, error => {
      console.log(error);
    });
  }

}
