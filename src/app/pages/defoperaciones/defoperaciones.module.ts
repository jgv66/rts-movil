import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperacionesPageRoutingModule } from './defoperaciones-routing.module';

import { DefoperacionesPage } from './defoperaciones.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefoperacionesPage]
})
export class DefoperacionesPageModule {}
