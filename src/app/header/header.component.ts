import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route:Router,private api:ApiService){}
   countWIshlist:Number=0
   countCart:Number=0
  loginUsername: any = ""
  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      this.loginUsername = sessionStorage.getItem("username")
      this.api.wishlistCount.subscribe((res:any)=>{
        this.countWIshlist=res

      })
      this.api.cartCount.subscribe((res:any)=>{
        this.countCart=res
      })
    }
    else {
      this.loginUsername = ""
    }
  }
  logout(){
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("password")
    sessionStorage.removeItem("token")
    this.route.navigateByUrl("")
    this.loginUsername=""
    this.countWIshlist=0
  }
  
}