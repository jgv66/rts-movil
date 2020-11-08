import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefoperarioPage } from './defoperario.page';

const routes: Routes = [
  {
    path: '',
    component: DefoperarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefoperarioPageRoutingModule {}
