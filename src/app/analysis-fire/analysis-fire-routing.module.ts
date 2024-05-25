import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalysisFirePage } from './analysis-fire.page';

const routes: Routes = [
  {
    path: '',
    component: AnalysisFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisFirePageRoutingModule {}
