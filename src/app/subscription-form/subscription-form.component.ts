// subscription-form.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubService } from '../services/sub.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {
  subscriptionForm: FormGroup;
 isSubscribed: boolean = false
  constructor(private formBuilder: FormBuilder, private subService: SubService) {
    this.subscriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      // Handle form submission
      console.log(this.subscriptionForm.value);
      this.subService.checkSubs(this.subscriptionForm.value.email).subscribe(val => {
        if (val.empty) {
          this.subService.addSubs(this.subscriptionForm.value).then(() => {
            this.isSubscribed = true;
            alert('Subscription successful');
          }).catch(error => {
            console.error('Subscription failed', error);
          });
        } else {
          alert('Email Address is Already in use');
        }
      }, error => {
        console.error('Error checking subscription', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
