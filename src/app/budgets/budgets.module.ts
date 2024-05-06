import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { BudgetService } from '../services/budget.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,HttpClientModule
  ],
  declarations: [BudgetsPage],
  providers:[BudgetService]
})
export class BudgetsPageModule {}
