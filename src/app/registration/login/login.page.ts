import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireloginService } from 'src/app/services/firelogin.service';
import { RegisterService } from 'src/app/services/register.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string=''
  password:any
  loginForm: FormGroup ;

  constructor(private toastController: ToastController, private apiService:RegisterService,private fb: FormBuilder,private route: Router,private firelogin:FireloginService) { 
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }


  get form() {
    return this.loginForm.controls;
  }

  // login() {
  //   // this.route.navigate(['/records'])
  //   console.log("insidelogin")
  //   if (this.loginForm.invalid) {
  //     return this.loginForm.markAllAsTouched();
  //   }
  //   let data = this.loginForm.value;
  //   console.log(data,'data checks')
  //   this.apiService.loginUser(data).subscribe({
  //     next: (res:any) => {
       
  //       localStorage.setItem("accessToken",res.token)
  //       localStorage.setItem("sessionId",res.sessionId)
  //       localStorage.setItem("userId",res.userid)
       
  //       localStorage.setItem("userName",res.name)
  //           this.route.navigate(['/records'], { queryParams: { id: res.userid } });
          
       
  //     },
  //     error:(err:HttpErrorResponse) => {
  //       // this.messageService.add({key: 'myKey2', severity:'error', summary: 'Failure', detail:err['error'].message});
  //     }
  //   })
  // }

  login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    

    const { email, password } = this.loginForm.value;
    this.firelogin.loginUser(email, password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log('Login successful');
        this.presentToast('Login successful', 'success');
        this.route.navigate(['/records'])
        // Redirect or navigate to another page
      } else {
        this.presentToast('Invalid email or password', 'danger');
        // console.log('Login failed: Invalid email or password');
        // Display error message or handle failed login
      }
    });
  }

}
