import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DigestService } from '../../shared/data-access/service/digest.service';

@Component({
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Digests</ion-title>
        <ion-buttons (click)="navigateTo(digestEditUrl)" slot="end">
          <ion-button color="success">
            <ion-icon name="add-circle" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Digests</ion-title>
          <ion-buttons (click)="navigateTo(digestEditUrl)" slot="end">
            <ion-button color="success">
              <ion-icon name="add-circle" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <app-digest-list />
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabDigestPage {
  private readonly router = inject(Router);
  private readonly digestService = inject(DigestService);

  public digestEditUrl = 'tabs/digest/edit';

  constructor() {
    this.digestService.load();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
