import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdtermPageRoutingModule } from './prodterm-routing.module';

import { ProdtermPage } from './prodterm.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdtermPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProdtermPage]
})
export class ProdtermPageModule {}
