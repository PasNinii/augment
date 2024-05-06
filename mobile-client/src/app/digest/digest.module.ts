import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormModule } from '../shared/feature/form/form.module';
import { ProgressBarComponent } from '../shared/ui/progress-bar/progress-bar.component';
import { DigestRoutingModule } from './digest-routing.module';
import { DigestFormComponentWrapper } from './feature/digest-form-wrapper.component';
import { DigestListComponent } from './feature/digest-list.component';
import { DigestDetailComponent } from './ui/digest-detail.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DigestRoutingModule, IonicModule, FormModule, ProgressBarComponent],
  declarations: [DigestFormComponentWrapper, DigestListComponent, DigestDetailComponent],
  exports: [DigestListComponent],
})
export class DigestModule {}
