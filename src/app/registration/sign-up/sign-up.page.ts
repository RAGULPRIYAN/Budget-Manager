import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup ;
  constructor( private fb: FormBuilder,private route: Router,private apiService:RegisterService) { 
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

  login() {
  
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }
    let data = this.signUpForm.value;
    this.apiService.addUser(data).subscribe({
      next: (res:any) => {
       
        localStorage.setItem("accessToken",res.token)
        localStorage.setItem("sessionId",res.sessionId)
        localStorage.setItem("userId",res.userid)
        localStorage.setItem("roleId",res.roleId)
        localStorage.setItem("roleName",res.roleName)
        
            this.route.navigate(['/login']);

          
       
      },
      error:(err:HttpErrorResponse) => {
        // this.messageService.add({key: 'myKey2', severity:'error', summary: 'Failure', detail:err['error'].message});
      }
    })
  }

}
