import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperacionPageRoutingModule } from './defoperacion-routing.module';

import { DefoperacionPage } from './defoperacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefoperacionPage]
})
export class DefoperacionPageModule {}
