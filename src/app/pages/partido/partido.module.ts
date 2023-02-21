import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartidoPageRoutingModule } from './partido-routing.module';

import { PartidoPage } from './partido.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartidoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PartidoPage]
})
export class PartidoPageModule {}
