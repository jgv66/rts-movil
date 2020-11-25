import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddofPage } from './addof.page';

const routes: Routes = [
  {
    path: '',
    component: AddofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddofPageRoutingModule {}
