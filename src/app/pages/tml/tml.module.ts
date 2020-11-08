import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmlPageRoutingModule } from './tml-routing.module';

import { TmlPage } from './tml.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmlPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TmlPage]
})
export class TmlPageModule {}
