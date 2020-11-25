import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefoperariosPageRoutingModule } from './defoperarios-routing.module';

import { DefoperariosPage } from './defoperarios.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DefoperarioPage } from '../defoperario/defoperario.page';
import { DefoperarioPageModule } from '../defoperario/defoperario.module';

@NgModule({
  entryComponents: [DefoperarioPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefoperariosPageRoutingModule,
    ComponentsModule,
    DefoperarioPageModule
  ],
  declarations: [DefoperariosPage]
})
export class DefoperariosPageModule {}
