import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { HdComponent } from './hd/hd.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MenulateralComponent } from './menulateral/menulateral.component';

@NgModule({
  declarations: [
    HeaderComponent, HdComponent, DrawerComponent, MenulateralComponent
  ],
  exports: [
    HeaderComponent, HdComponent, DrawerComponent, MenulateralComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
