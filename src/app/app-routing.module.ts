import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home',            loadChildren: () => import('./pages/home/home.module')    .then( m => m.HomePageModule)  },
  { path: 'login',           loadChildren: () => import('./pages/login/login.module')  .then( m => m.LoginPageModule) },
  { path: 'inicio',          loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)},
  { path: 'recepcioncompra', loadChildren: () => import('./pages/recepcioncompra/recepcioncompra.module').then( m => m.RecepcioncompraPageModule) },
  { path: 'recepcioninterna',loadChildren: () => import('./pages/recepcioninterna/recepcioninterna.module').then( m => m.RecepcioninternaPageModule) },
  { path: 'produccion',      loadChildren: () => import('./pages/produccion/produccion.module').then( m => m.ProduccionPageModule)},
  { path: 'tml',             loadChildren: () => import('./pages/tml/tml.module').then( m => m.TmlPageModule) },
  { path: 'tmldet',          loadChildren: () => import('./pages/tmldet/tmldet.module').then( m => m.TmldetPageModule)  },
  { path: 'prodterm',        loadChildren: () => import('./pages/prodterm/prodterm.module').then( m => m.ProdtermPageModule) },
  { path: 'defof',           loadChildren: () => import('./pages/defof/defof.module').then( m => m.DefofPageModule) },
  { path: 'defmaquinas',     loadChildren: () => import('./pages/defmaquinas/defmaquinas.module').then( m => m.DefmaquinasPageModule) },
  { path: 'defmaquinasdef',  loadChildren: () => import('./pages/defmaquinasdef/defmaquinasdef.module').then( m => m.DefmaquinasdefPageModule) },
  { path: 'defoperarios',    loadChildren: () => import('./pages/defoperarios/defoperarios.module').then( m => m.DefoperariosPageModule) },
  { path: 'defoperaciones',  loadChildren: () => import('./pages/defoperaciones/defoperaciones.module').then( m => m.DefoperacionesPageModule) },
  { path: 'defestatus',      loadChildren: () => import('./pages/defestatus/defestatus.module').then( m => m.DefestatusPageModule) },
  { path: 'addof',           loadChildren: () => import('./pages/addof/addof.module').then( m => m.AddofPageModule)  },
  { path: 'verdataof',       loadChildren: () => import('./pages/verdataof/verdataof.module').then( m => m.VerdataofPageModule)},
  { path: '',                redirectTo: 'home', pathMatch: 'full' },  {
    path: 'revisaroc',
    loadChildren: () => import('./pages/revisaroc/revisaroc.module').then( m => m.RevisarocPageModule)
  },
  {
    path: 'encurso',
    loadChildren: () => import('./pages/encurso/encurso.module').then( m => m.EncursoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
