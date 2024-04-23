import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProduct: any = []
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }
  getAllProduct() {
    this.api.getAllProductsAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProduct = res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  addToWishlist(product: any) {
    if (sessionStorage.getItem("token")) {
      this.api.addToWishlist(product).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Success",
            text: "added to wishlist succefullly",
            icon: "success"
          });
          this.api.updateWishlisdtCount()
        },
        error: (err: any) => {
          Swal.fire({
            title: "oops",
            text: err.error,
            icon: "error"
          });
        }
      })
    }
    else {
      Swal.fire({
        title: "Oops",
        text: "please login!",
        icon: "warning"
      });
    }


  }
  addToCart(product: any) {
    if (sessionStorage.getItem("token")) {
      Object.assign(product,{quantity:1})
      this.api.addToCartAPI(product).subscribe({
        next: (res: any) => {
          console.log("asdfafd0",res);
          
          Swal.fire({
            title: "Success",
            text: "added to cart succefullly",
            icon: "success"
          });
          this.api.updateCartCount()

        },
        error: (err: any) => {
          Swal.fire({
            title: "oops",
            text: err.error,
            icon: "error"
          });
        }
      })
    }
    else {
      Swal.fire({
        title: "Oops",
        text: "please login!",
        icon: "warning"
      });
    }


  }

}
