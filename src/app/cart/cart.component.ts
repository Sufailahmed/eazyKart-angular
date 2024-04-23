import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCarts: any = []
  totalAmount: any = 0

  ngOnInit(): void {
    this.getAllCarts()
  }

  constructor(private api: ApiService,private route:Router) { }
  getAllCarts() {
    this.api.getCartsAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allCarts = res
        this.getTotalPrice()
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  removeItem(id: any) {
    this.api.deleteCartAPI(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Success",
          text: "Succefully removed",
          icon: "success"
        });
        this.api.updateCartCount()
        this.getAllCarts()


      },
      error: (err: any) => {
        Swal.fire({
          title: "oops!",
          text: err.error,
          icon: "error"
        });
      }
    })

  }
  getTotalPrice() {
    if (this.allCarts.length > 0) {
      this.totalAmount = Math.ceil(this.allCarts.map((item: any) => item.grandTotoal).reduce((amt1: any, amt2: any) => amt1 + amt2))
      console.log(this.totalAmount);
    } else {
      this.totalAmount = 0
    }
  }

  incrementItem(id: any) {
    this.api.incrementAPI(id).subscribe({
      next: (res: any) => {
        this.getAllCarts()
        this.api.updateCartCount()
      }, error: (err: any) => {
        console.log(err);

      }
    })

  }
  decrementItem(id: any) {
    this.api.deccrementAPI(id).subscribe({
      next: (res: any) => {
        this.getAllCarts()
        this.api.updateCartCount()
      }, error: (err: any) => {
        console.log(err);

      }
    })

  }
  emptyCart() {
     this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getAllCarts()
        this.api.updateCartCount()   
      },
      error:(err:any)=>{
        console.log(err);
        
      }
     })
  }

 checkout(){
  sessionStorage.setItem("totalAmount",this.totalAmount)
  this.route.navigateByUrl('checkout')

 }
}
