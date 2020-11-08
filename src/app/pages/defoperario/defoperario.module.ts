import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperarioPageRoutingModule } from './defoperario-routing.module';

import { DefoperarioPage } from './defoperario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefoperarioPage]
})
export class DefoperarioPageModule {}
