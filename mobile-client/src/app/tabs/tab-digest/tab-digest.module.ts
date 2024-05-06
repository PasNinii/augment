import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabDigestPage } from './tab-digest.component';

import { TabDigestPageRoutingModule } from './tab-digest-routing.module';
import { DigestModule } from '../../digest/digest.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DigestModule, TabDigestPageRoutingModule],
  declarations: [TabDigestPage],
})
export class TabDigestPageModule {}
