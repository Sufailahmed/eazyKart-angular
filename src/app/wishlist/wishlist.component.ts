import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  allWishlists:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getAllWishlists()
  }
  getAllWishlists(){
    this.api.getWishlist().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allWishlists=res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    }
    removeItem(id:any){
      this.api.deleteWishlistAPI(id).subscribe({
        next:(res:any)=>{
          Swal.fire({
            title: "Success",
            text: "Succefully removed",
            icon: "success"
          });
          this.api.updateWishlisdtCount()
          this.getAllWishlists()


        },
        error:(err:any)=>{
          Swal.fire({
            title: "oops!",
            text: err.error,
            icon: "error"
          });
        }
      })

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
