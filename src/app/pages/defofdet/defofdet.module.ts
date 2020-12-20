import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefofdetPageRoutingModule } from './defofdet-routing.module';

import { DefofdetPage } from './defofdet.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefofdetPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefofdetPage]
})
export class DefofdetPageModule {}
