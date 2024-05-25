import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetsFirePage } from './budgets-fire.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetsFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsFirePageRoutingModule {}
