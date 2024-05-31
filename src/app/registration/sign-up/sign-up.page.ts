import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireloginService } from 'src/app/services/firelogin.service';
import { RegisterService } from 'src/app/services/register.service';
import * as bcrypt from 'bcryptjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup ;
  constructor(  private toastController: ToastController,private fb: FormBuilder,private route: Router,private apiService:RegisterService,private firelogin:FireloginService) { 
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

  // signUp() {
  
  //   if (this.signUpForm.invalid) {
  //     return this.signUpForm.markAllAsTouched();
  //   }
  //   let data = this.signUpForm.value;
  //   this.apiService.addUser(data).subscribe({
  //     next: (res:any) => {
       
  //       localStorage.setItem("accessToken",res.token)
  //       localStorage.setItem("sessionId",res.sessionId)
  //       localStorage.setItem("userId",res.userid)
       
        
  //           this.route.navigate(['/login']);

          
       
  //     },
  //     error:(err:HttpErrorResponse) => {
  //       // this.messageService.add({key: 'myKey2', severity:'error', summary: 'Failure', detail:err['error'].message});
  //     }
  //   })
  // }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }
  
    let data = this.signUpForm.value;
    const saltRounds = 10; // Number of salt rounds for hashing
  
    // Hash the password
    bcrypt.hash(data.password, saltRounds, (err: any, hash: any) => {
      if (err) {
        // console.error('Error hashing password', err);
         this.presentToast('Error hashing password', 'danger');
        // Handle the error (e.g., show a toast notification)
        return;
      }
  
      // Replace the plain password with the hashed password
      data.password = hash;
  
      // Check if the email already exists and create user if not
      this.firelogin.createUser(data).then(() => {
        this.route.navigate(['/login']);
         this.presentToast('User created successfully!', 'success');
        // Handle successful user creation (e.g., navigate to another page, show a success message)
      }).catch(err => {
        if (err.message === 'Email already exists') {
          // console.error('Email already exists', err);
          this.presentToast('Email already exists', 'warning');
          // Handle the error (e.g., show a toast notification)
        } else {
          // console.error('Error creating user', err);
          this.presentToast('Error creating user', 'danger');
          // Handle other errors (e.g., show a toast notification)
        }
      });
    });
  }
  
}
