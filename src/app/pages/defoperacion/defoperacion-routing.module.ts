import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefoperacionPage } from './defoperacion.page';

const routes: Routes = [
  {
    path: '',
    component: DefoperacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefoperacionPageRoutingModule {}
