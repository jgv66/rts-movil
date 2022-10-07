import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncursoPage } from './encurso.page';

const routes: Routes = [
  {
    path: '',
    component: EncursoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncursoPageRoutingModule {}
