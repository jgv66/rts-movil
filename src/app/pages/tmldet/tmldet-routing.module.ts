import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmldetPage } from './tmldet.page';

const routes: Routes = [
  {
    path: '',
    component: TmldetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmldetPageRoutingModule {}
