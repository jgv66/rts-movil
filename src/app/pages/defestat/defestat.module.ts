import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefestatPageRoutingModule } from './defestat-routing.module';

import { DefestatPage } from './defestat.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefestatPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefestatPage]
})
export class DefestatPageModule {}
