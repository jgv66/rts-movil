import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefoperariosPage } from './defoperarios.page';

const routes: Routes = [
  {
    path: '',
    component: DefoperariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefoperariosPageRoutingModule {}
