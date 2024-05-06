import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalysisPageRoutingModule } from './analysis-routing.module';

import { AnalysisPage } from './analysis.page';
import { BudgetService } from '../services/budget.service';
import { HttpClientModule } from '@angular/common/http';
import { FcmService } from '../services/fcm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalysisPageRoutingModule,HttpClientModule
  ],
  declarations: [AnalysisPage],
  providers:[BudgetService,FcmService]
})
export class AnalysisPageModule {}
