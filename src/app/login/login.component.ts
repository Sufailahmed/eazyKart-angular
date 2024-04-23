import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private api:ApiService,private route:Router) { }
  loginForm = this.fb.group({
    email: ['ahmed', [Validators.required, Validators.email]],
    password: ['ajndf', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  })
  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const user = {
        email,
        password
      }
      this.api.loginAPI(user).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          Swal.fire({
            title: "Success",
            text: "user logined succefully",
            icon: "success"
          });
          this.api.updateWishlisdtCount()
          this.api.updateCartCount()
          this.route.navigateByUrl("")
        },
        error:(err:any)=>{
          Swal.fire({
            title: "ERROR",
            text: "Invalid Email or Password",
            icon: "error"
          });
        }
      })
    }
  }
}
