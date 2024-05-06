import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemainderPageRoutingModule } from './remainder-routing.module';

import { RemainderPage } from './remainder.page';
import { HttpClientModule } from '@angular/common/http';
import { BudgetService } from '../services/budget.service';
import { FcmService } from '../services/fcm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemainderPageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [RemainderPage],
  providers:[BudgetService,FcmService,DatePipe],

})
export class RemainderPageModule {}
