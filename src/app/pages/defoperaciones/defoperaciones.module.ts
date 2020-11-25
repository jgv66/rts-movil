import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperacionesPageRoutingModule } from './defoperaciones-routing.module';

import { DefoperacionesPage } from './defoperaciones.page';
import { ComponentsModule } from '../../components/components.module';
import { DefoperacionPage } from '../defoperacion/defoperacion.page';
import { DefoperacionPageModule } from '../defoperacion/defoperacion.module';

@NgModule({
  entryComponents: [ DefoperacionPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperacionesPageRoutingModule,
    ComponentsModule,
    DefoperacionPageModule
  ],
  declarations: [DefoperacionesPage]
})
export class DefoperacionesPageModule {}
