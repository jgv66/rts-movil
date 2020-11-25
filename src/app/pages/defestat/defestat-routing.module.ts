import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefestatPage } from './defestat.page';

const routes: Routes = [
  {
    path: '',
    component: DefestatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefestatPageRoutingModule {}
