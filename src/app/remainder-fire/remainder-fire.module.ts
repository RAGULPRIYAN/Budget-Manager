import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemainderFirePageRoutingModule } from './remainder-fire-routing.module';

import { RemainderFirePage } from './remainder-fire.page';
import { BudgetfireService } from '../services/budgetfire.service';
import { HttpClientModule } from '@angular/common/http';
import { RemainderFireService } from '../services/remainder-fire.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemainderFirePageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [RemainderFirePage],
  providers:[BudgetfireService,DatePipe,RemainderFireService]
})
export class RemainderFirePageModule {}
