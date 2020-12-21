import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerdataofPage } from './verdataof.page';

const routes: Routes = [
  {
    path: '',
    component: VerdataofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerdataofPageRoutingModule {}
