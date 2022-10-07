import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepcioninternaPageRoutingModule } from './recepcioninterna-routing.module';

import { RecepcioninternaPage } from './recepcioninterna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepcioninternaPageRoutingModule
  ],
  declarations: [RecepcioninternaPage]
})
export class RecepcioninternaPageModule {}
