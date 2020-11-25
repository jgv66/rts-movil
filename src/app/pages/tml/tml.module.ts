import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmlPageRoutingModule } from './tml-routing.module';

import { TmlPage } from './tml.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TmldetPage } from '../tmldet/tmldet.page';
import { TmldetPageModule } from '../tmldet/tmldet.module';

@NgModule({
  entryComponents: [ TmldetPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmlPageRoutingModule,
    ComponentsModule,
    TmldetPageModule
  ],
  declarations: [TmlPage]
})
export class TmlPageModule {}
