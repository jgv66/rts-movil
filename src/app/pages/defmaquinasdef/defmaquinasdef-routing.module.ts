import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefmaquinasdefPage } from './defmaquinasdef.page';

const routes: Routes = [
  {
    path: '',
    component: DefmaquinasdefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefmaquinasdefPageRoutingModule {}
