import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefofdetPageRoutingModule } from './defofdet-routing.module';

import { DefofdetPage } from './defofdet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefofdetPageRoutingModule
  ],
  declarations: [DefofdetPage]
})
export class DefofdetPageModule {}
