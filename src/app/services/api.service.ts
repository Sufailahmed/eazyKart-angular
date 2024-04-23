import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = 'https://eazykart-backend-angular.onrender.com'


  //behaviour subject creation
  wishlistCount = new BehaviorSubject(0)
  updateWishlisdtCount() {
    this.getWishlist().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
  }
cartCount=new BehaviorSubject(0)
updateCartCount(){
  this.getCartsAPI().subscribe((res:any)=>{
    this.cartCount.next(res.length)
  })
}
  constructor(private http: HttpClient) { this.updateWishlisdtCount();this.updateCartCount() }
  //common function for header creation
  addTokenHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token");
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }
  getAllProductsAPI() {
    return this.http.get(`${this.server_url}/all-product`)
  }
  registerAPI(user: any) {
    return this.http.post(`${this.server_url}/register`, user)

  }
  loginAPI(user: any) {
    return this.http.post(`${this.server_url}/login`, user)

  }
  getproductByIdAPI(id: any) {
    return this.http.get(`${this.server_url}/productDetails/${id}`)
  }

  addToWishlist(product: any) {
    return this.http.post(`${this.server_url}/addwishlist`, product, this.addTokenHeader())
  }
  getWishlist() {
    return this.http.get(`${this.server_url}/getWishlistItems`, this.addTokenHeader())
  }
  deleteWishlistAPI(id: any) {
    return this.http.delete(`${this.server_url}/deletewishlists/${id}`, this.addTokenHeader())
  }
  addToCartAPI(product: any) {
    return this.http.post(`${this.server_url}/addtocart`, product, this.addTokenHeader())
  }
  getCartsAPI() {
    return this.http.get(`${this.server_url}/getCartItems`, this.addTokenHeader())
  }
  deleteCartAPI(id: any) {
    return this.http.delete(`${this.server_url}/deletecart/${id}`, this.addTokenHeader())
  }
   incrementAPI(id:any){
    return this.http.get(`${this.server_url}/increment/${id}`,this.addTokenHeader())
   }
   deccrementAPI(id:any){
    return this.http.get(`${this.server_url}/decrement/${id}`,this.addTokenHeader())
   }
   emptyCartAPI(){
    return this.http.get(`${this.server_url}/emptyCart`,this.addTokenHeader())
   }
}
