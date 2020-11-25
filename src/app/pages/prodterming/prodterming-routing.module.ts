import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdtermingPage } from './prodterming.page';

const routes: Routes = [
  {
    path: '',
    component: ProdtermingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdtermingPageRoutingModule {}
