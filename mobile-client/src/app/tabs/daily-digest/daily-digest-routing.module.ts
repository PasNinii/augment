import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyDigestComponent } from './daily-digest.component';

const routes: Routes = [
  {
    path: '',
    component: DailyDigestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyDigestRoutingModule {}
