import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepcioninternaPage } from './recepcioninterna.page';

const routes: Routes = [
  {
    path: '',
    component: RecepcioninternaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcioninternaPageRoutingModule {}
