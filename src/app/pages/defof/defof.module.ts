import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefofPageRoutingModule } from './defof-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

import { DefofPage } from './defof.page';

import { DefofdetPage } from '../defofdet/defofdet.page';
import { DefofdetPageModule } from '../defofdet/defofdet.module';
import { AddofPage } from '../addof/addof.page';
import { AddofPageModule } from '../addof/addof.module';

@NgModule({
  entryComponents: [DefofdetPage, AddofPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefofPageRoutingModule,
    ComponentsModule,
    PipesModule,
    DefofdetPageModule,
    AddofPageModule
  ],
  declarations: [DefofPage]
})
export class DefofPageModule {}
