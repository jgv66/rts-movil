import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { HdComponent } from './hd/hd.component';

@NgModule({
  declarations: [
    HeaderComponent, HdComponent
  ],
  exports: [
    HeaderComponent, HdComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
