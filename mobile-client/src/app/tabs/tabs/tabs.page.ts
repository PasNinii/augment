import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon name="storefront-outline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="digest">
          <ion-icon name="server-outline" />
          <ion-label>Digests</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="daily-digest">
          <ion-icon name="play-outline" />
          <ion-label>Daily</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="dive-deep">
          <ion-icon name="podium-outline" />
          <ion-label>Dive deep</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {}
