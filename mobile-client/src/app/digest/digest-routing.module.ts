import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDigestPage } from '../tabs/tab-digest/tab-digest.component';
import { DigestFormComponentWrapper } from './feature/digest-form-wrapper.component';

const routes: Routes = [
  { path: '', component: TabDigestPage },
  { path: 'edit', component: DigestFormComponentWrapper },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigestRoutingModule {}
