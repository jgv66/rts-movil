import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefmaquinasPageRoutingModule } from './defmaquinas-routing.module';

import { DefmaquinasPage } from './defmaquinas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DefmaquinasdefPage } from '../defmaquinasdef/defmaquinasdef.page';
import { DefmaquinasdefPageModule } from '../defmaquinasdef/defmaquinasdef.module';

@NgModule({
  entryComponents: [ DefmaquinasdefPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefmaquinasPageRoutingModule,
    ComponentsModule,
    DefmaquinasdefPageModule
  ],
  declarations: [DefmaquinasPage]
})
export class DefmaquinasPageModule {}
