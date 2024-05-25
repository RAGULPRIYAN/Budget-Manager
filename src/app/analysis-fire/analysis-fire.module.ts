import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalysisFirePageRoutingModule } from './analysis-fire-routing.module';

import { AnalysisFirePage } from './analysis-fire.page';
import { BudgetfireService } from '../services/budgetfire.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalysisFirePageRoutingModule,HttpClientModule
  ],
  declarations: [AnalysisFirePage],
  providers:[BudgetfireService]
})
export class AnalysisFirePageModule {}
