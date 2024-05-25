import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsFirePage } from './records-fire.page';

const routes: Routes = [
  {
    path: '',
    component: RecordsFirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsFirePageRoutingModule {}
