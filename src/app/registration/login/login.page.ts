import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string=''
  password:any
  loginForm: FormGroup ;

  constructor( private apiService:RegisterService,private fb: FormBuilder,private route: Router) { 
    this.loginForm = this.fb.group({
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
      checked: new FormControl(),
    });
  }

  ngOnInit() {


  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
  
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    let data = this.loginForm.value;
    this.apiService.loginUser(data).subscribe({
      next: (res:any) => {
       
        localStorage.setItem("accessToken",res.token)
        localStorage.setItem("sessionId",res.sessionId)
        localStorage.setItem("userId",res.userid)
       
        localStorage.setItem("userName",res.name)
            this.route.navigate(['/records'], { queryParams: { id: res.userid } });
          
       
      },
      error:(err:HttpErrorResponse) => {
        // this.messageService.add({key: 'myKey2', severity:'error', summary: 'Failure', detail:err['error'].message});
      }
    })
  }

}
