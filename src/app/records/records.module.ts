import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordsPageRoutingModule } from './records-routing.module';

import { RecordsPage } from './records.page';
import { HttpClientModule } from '@angular/common/http';
import { BudgetService } from '../services/budget.service';
import { FcmService } from '../services/fcm.service';
import { RegisterService } from '../services/register.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordsPageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [RecordsPage],
  providers:[BudgetService,FcmService,DatePipe,RegisterService]
})
export class RecordsPageModule {}
