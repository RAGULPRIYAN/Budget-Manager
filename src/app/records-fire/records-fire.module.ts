import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordsFirePageRoutingModule } from './records-fire-routing.module';

import { RecordsFirePage } from './records-fire.page';
import { BudgetfireService } from '../services/budgetfire.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../services/register.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordsFirePageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [RecordsFirePage],
  providers:[BudgetfireService,RegisterService,DatePipe]
})
export class RecordsFirePageModule {}
