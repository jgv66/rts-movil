import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduccionPageRoutingModule } from './produccion-routing.module';

import { ProduccionPage } from './produccion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduccionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProduccionPage]
})
export class ProduccionPageModule {}
