import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { FireloginService } from 'src/app/services/firelogin.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,ReactiveFormsModule,HttpClientModule
  ],
  declarations: [SignUpPage],
  providers:[RegisterService,HttpClientModule,FireloginService,AngularFirestoreModule]
})
export class SignUpPageModule {}
