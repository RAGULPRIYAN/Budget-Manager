import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireloginService } from 'src/app/services/firelogin.service';
import { RegisterService } from 'src/app/services/register.service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup ;
  constructor( private fb: FormBuilder,private route: Router,private apiService:RegisterService,private firelogin:FireloginService) { 
    this.signUpForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$"
          ),
        ],
      ],
      password: [null, [Validators.required]],
      name:[null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get form() {
    return this.signUpForm.controls;
  }

  signUp() {
  
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }
    let data = this.signUpForm.value;
    this.apiService.addUser(data).subscribe({
      next: (res:any) => {
       
        localStorage.setItem("accessToken",res.token)
        localStorage.setItem("sessionId",res.sessionId)
        localStorage.setItem("userId",res.userid)
       
        
            this.route.navigate(['/login']);

          
       
      },
      error:(err:HttpErrorResponse) => {
        // this.messageService.add({key: 'myKey2', severity:'error', summary: 'Failure', detail:err['error'].message});
      }
    })
  }

  // signUp() {
  //   if (this.signUpForm.invalid) {
  //     return this.signUpForm.markAllAsTouched();
  //   }
  //   let data = this.signUpForm.value;
  //   const saltRounds = 10; // Number of salt rounds for hashing

  //   // Hash the password
  //   bcrypt.hash(data.password, saltRounds, (err: any, hash: any) => {
  //     if (err) {
  //       console.error('Error hashing password', err);
  //       // Handle the error (e.g., show a toast notification)
  //       return;
  //     }

  //     // Replace the plain password with the hashed password
  //     data.password = hash;

  //     // Create user in Firebase with hashed password
  //     this.firelogin.createUser(data).then(() => {
  //       this.route.navigate(['/login']);
  //       // Handle successful user creation (e.g., navigate to another page, show a success message)
  //     }, err => {
  //       console.error('Error creating user', err);
  //       // Handle the error (e.g., show a toast notification)
  //     });
  //   });
  // }
}
