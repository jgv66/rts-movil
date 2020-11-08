import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefofPageRoutingModule } from './defof-routing.module';

import { DefofPage } from './defof.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefofPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefofPage]
})
export class DefofPageModule {}
