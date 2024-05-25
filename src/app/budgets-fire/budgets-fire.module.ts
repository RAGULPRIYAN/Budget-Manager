import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsFirePageRoutingModule } from './budgets-fire-routing.module';

import { BudgetsFirePage } from './budgets-fire.page';
import { BudgetfireService } from '../services/budgetfire.service';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsFirePageRoutingModule,HttpClientModule
  ],
  declarations: [BudgetsFirePage],
  providers:[BudgetfireService]
})
export class BudgetsFirePageModule {}
