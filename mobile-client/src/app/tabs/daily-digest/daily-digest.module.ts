import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DailyDigestRoutingModule } from './daily-digest-routing.module';
import { DailyDigestComponent } from './daily-digest.component';
import { SwipeComponent } from './swipe/swipe.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DailyDigestRoutingModule],
  declarations: [DailyDigestComponent, SwipeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DailyDigestModule {}
