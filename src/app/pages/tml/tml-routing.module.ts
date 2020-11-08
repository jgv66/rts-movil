import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmlPage } from './tml.page';

const routes: Routes = [
  {
    path: '',
    component: TmlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmlPageRoutingModule {}
