import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { DiveDeepComponent } from '../../security/dive-deep.component';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule, HttpClientModule],
  declarations: [TabsPage, DiveDeepComponent],
})
export class TabsPageModule {}
