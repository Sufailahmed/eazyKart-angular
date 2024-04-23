import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb:FormBuilder, private api:ApiService,private route:Router){}

  registerForm=this.fb.group({
    username:['sufail',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['ahmed',[Validators.required,Validators.email]],
    password:['ajndf',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    

  })
  registerUser(){
if(this.registerForm.valid){
  const username=this.registerForm.value.username;
  const email=this.registerForm.value.email;
  const password=this.registerForm.value.password;
  console.log(username,email,password);
  const user={
    username,
    email,
    password
  }
  this.api.registerAPI(user).subscribe({
    next:(res:any)=>{
      Swal.fire({
        title: "Success",
        text: "user registered succefully",
        icon: "success"
      });
      this.route.navigateByUrl('/')
    },
    error:(res:any)=>{
      Swal.fire({
        title: "Error",
        text: "failed to register",
        icon: "error"
      });
    }
  })
}
  
}
  }
