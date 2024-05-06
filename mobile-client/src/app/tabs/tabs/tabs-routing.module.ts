import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiveDeepComponent } from '../../security/dive-deep.component';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab-home/tab-home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'digest',
        loadChildren: () => import('../tab-digest/tab-digest.module').then((m) => m.TabDigestPageModule),
      },
      {
        path: 'daily-digest',
        loadChildren: () => import('../daily-digest/daily-digest.module').then((m) => m.DailyDigestModule),
      },
      {
        path: 'digest',
        loadChildren: () => import('../../digest/digest.module').then((m) => m.DigestModule),
      },
      {
        path: 'dive-deep',
        component: DiveDeepComponent,
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
