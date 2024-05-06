import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormWrapperComponent } from './form-wrapper.component';
import { FormComponent } from './form.component';

@NgModule({
  imports: [ReactiveFormsModule, IonicModule, CommonModule],
  declarations: [FormWrapperComponent, FormComponent],
  exports: [FormWrapperComponent],
})
export class FormModule {}
