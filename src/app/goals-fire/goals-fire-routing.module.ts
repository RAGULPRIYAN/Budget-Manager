import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsFirePage } from './goals-fire.page';

const routes: Routes = [
  {
    path: '',
    component: GoalsFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsFirePageRoutingModule {}
