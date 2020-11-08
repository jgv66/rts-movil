import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdtermPage } from './prodterm.page';

const routes: Routes = [
  {
    path: '',
    component: ProdtermPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdtermPageRoutingModule {}
