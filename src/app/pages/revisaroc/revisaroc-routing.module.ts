import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarocPage } from './revisaroc.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarocPageRoutingModule {}
