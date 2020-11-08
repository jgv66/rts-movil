import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefofPage } from './defof.page';

const routes: Routes = [
  {
    path: '',
    component: DefofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefofPageRoutingModule {}
