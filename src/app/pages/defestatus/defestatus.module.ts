import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefestatusPageRoutingModule } from './defestatus-routing.module';

import { DefestatusPage } from './defestatus.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DefestatPageModule } from '../defestat/defestat.module';
import { DefestatPage } from '../defestat/defestat.page';

@NgModule({
  entryComponents: [ DefestatPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefestatusPageRoutingModule,
    ComponentsModule,
    DefestatPageModule
  ],
  declarations: [DefestatusPage]
})
export class DefestatusPageModule {}
