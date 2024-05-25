import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsFirePageRoutingModule } from './goals-fire-routing.module';

import { GoalsFirePage } from './goals-fire.page';
import { GoalfireService } from '../services/goalfire.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalsFirePageRoutingModule,HttpClientModule,DatePipe
  ],
  declarations: [GoalsFirePage],
  providers:[GoalfireService,DatePipe]
})
export class GoalsFirePageModule {}
