import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productData: any = []
  constructor(private api: ApiService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const id = res.id;
      console.log(id);
      this.getProduct(id)
    })
  }
  getProduct(id: any) {
    this.api.getproductByIdAPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productData = res

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  addToWishlist(productData: any) {
    if (sessionStorage.getItem("token")) {
      this.api.addToWishlist(productData).subscribe({
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
