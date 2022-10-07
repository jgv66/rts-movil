import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

import { EncursoPageRoutingModule } from './encurso-routing.module';
import { EncursoPage } from './encurso.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncursoPageRoutingModule,
    BrowserModule,
    BarcodeScannerLivestreamModule,
    ComponentsModule
  ],
  declarations: [EncursoPage]
})
export class EncursoPageModule {}
