import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabHomePage } from './tab-home.component';

import { HomePageRoutingModule } from './tab-home-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [TabHomePage],
})
export class HomePageModule {}
