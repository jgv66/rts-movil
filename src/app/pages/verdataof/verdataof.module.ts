import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerdataofPageRoutingModule } from './verdataof-routing.module';

import { VerdataofPage } from './verdataof.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerdataofPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerdataofPage]
})
export class VerdataofPageModule {}
