import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDigestPage } from './tab-digest.component';

const routes: Routes = [
  {
    path: '',
    component: TabDigestPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabDigestPageRoutingModule {}
