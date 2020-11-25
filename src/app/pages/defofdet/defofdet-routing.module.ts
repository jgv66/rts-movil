import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefofdetPage } from './defofdet.page';

const routes: Routes = [
  {
    path: '',
    component: DefofdetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefofdetPageRoutingModule {}
