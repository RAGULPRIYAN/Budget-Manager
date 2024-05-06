import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemainderPage } from './remainder.page';

const routes: Routes = [
  {
    path: '',
    component: RemainderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemainderPageRoutingModule {}
