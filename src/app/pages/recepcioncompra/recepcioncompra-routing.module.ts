import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepcioncompraPage } from './recepcioncompra.page';

const routes: Routes = [
  {
    path: '',
    component: RecepcioncompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcioncompraPageRoutingModule {}
