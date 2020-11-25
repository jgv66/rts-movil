import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { HdComponent } from './hd/hd.component';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  declarations: [
    HeaderComponent, HdComponent, DrawerComponent
  ],
  exports: [
    HeaderComponent, HdComponent, DrawerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
