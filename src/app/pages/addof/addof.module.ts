import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddofPageRoutingModule } from './addof-routing.module';

import { AddofPage } from './addof.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddofPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddofPage]
})
export class AddofPageModule {}
