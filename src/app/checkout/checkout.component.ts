import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit{
  public payPalConfig?: IPayPalConfig;
  public makepaymentStatus: boolean = false
  proceedToPayStatus: boolean = false;
  totalAmount: any = 0
ngOnInit(): void {
  this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '80.0',
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: '80.0'
                    }
                }
            },
            items: [{
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                    currency_code: 'USD',
                    value: '80.0',
                },
            }]
        }]
    },
    advanced: {
        commit: 'true'
    },
    style: {
        label: 'paypal',
        layout: 'vertical'
    },
    onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

    },
    onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
alert("payment success")
this.api.emptyCartAPI().subscribe({
  next:(res:any)=>{
 
    this.api.updateCartCount()   
  },
  error:(err:any)=>{
    console.log(err);
    
  }
 })
this.route.navigateByUrl("")   
this.makepaymentStatus=false;
this.proceedToPayStatus=false

},
    onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
       alert("Payment cancelled")

    },
    onError: err => {
        console.log('OnError', err);
  alert("error")
    },
    // onClick: (data, actions) => {
    //     console.log('onClick', data, actions);
    //     this.resetStatus();
    // }
};
}

  constructor(private fb: FormBuilder,private route:Router,private api:ApiService) { }
  checkoutform = this.fb.group({
    uname: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    house: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9, ]*')]],
    place: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9, ]*')]],
    pincode: ["", [Validators.required, Validators.pattern('[0-9]*')]],
  })



  proceedToBuy() {
    if (this.checkoutform.valid) {

      this.proceedToPayStatus = true
      if (sessionStorage.getItem("totalAmount")) {
        this.totalAmount = sessionStorage.getItem('totalAmount')
      }
    }
    else {
      alert("Please fill form completely")
    }
  }
  back() {
    this.proceedToPayStatus = false
  }
  makePayment() {
     this.makepaymentStatus=true
  }
}
