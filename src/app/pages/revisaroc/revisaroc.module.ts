import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevisarocPageRoutingModule } from './revisaroc-routing.module';
import { RevisarocPage } from './revisaroc.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,    
    RevisarocPageRoutingModule
  ],
  declarations: [RevisarocPage]
})
export class RevisarocPageModule {}
