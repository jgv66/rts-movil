import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefestatusPage } from './defestatus.page';

const routes: Routes = [
  {
    path: '',
    component: DefestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefestatusPageRoutingModule {}
