import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DigestService } from 'src/app/shared/data-access/service/digest.service';

@Component({
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> Daily </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Daily</ion-title>
        </ion-toolbar>
      </ion-header>

      @if (digestService.dailyDigest$ | async; as digests) {
      <div class="card-container">
        @if (activeView$ | async) {
        <ng-container>
          @for (digest of digests; track digest.id) {
          <app-swipe [digest]="digest" />
          }
        </ng-container>
        }
      </div>
      } @else {
      <ng-template #noDigest>
        <p>No remaining digest</p>
      </ng-template>
      }
    </ion-content>
  `,
  styleUrl: './daily-digest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyDigestComponent {
  public readonly digestService = inject(DigestService);

  public activeView$ = new BehaviorSubject<boolean>(true);

  ionViewDidEnter() {
    this.activeView$.next(true);
  }

  ionViewDidLeave() {
    this.activeView$.next(false);
    this.digestService.loadDailyDigest$.next();
  }

  constructor() {
    this.digestService.loadDailyDigest$.next();
  }
}
