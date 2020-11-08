import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperariosPageRoutingModule } from './defoperarios-routing.module';

import { DefoperariosPage } from './defoperarios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperariosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DefoperariosPage]
})
export class DefoperariosPageModule {}
