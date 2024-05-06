import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { GoalsPageRoutingModule } from './goals-routing.module';

import { GoalsPage } from './goals.page';
import { GoalService } from '../services/goal.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalsPageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [GoalsPage],
  providers:[GoalService,DatePipe]
})
export class GoalsPageModule {}
