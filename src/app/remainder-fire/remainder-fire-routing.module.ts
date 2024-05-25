import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemainderFirePage } from './remainder-fire.page';

const routes: Routes = [
  {
    path: '',
    component: RemainderFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemainderFirePageRoutingModule {}
