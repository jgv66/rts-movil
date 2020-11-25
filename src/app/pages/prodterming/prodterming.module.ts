import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdtermingPageRoutingModule } from './prodterming-routing.module';

import { ProdtermingPage } from './prodterming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdtermingPageRoutingModule
  ],
  declarations: [ProdtermingPage]
})
export class ProdtermingPageModule {}
