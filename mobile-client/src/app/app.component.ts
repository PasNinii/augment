import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DigestService } from './shared/data-access/service/digest.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly digestService = inject(DigestService);

  constructor() {
    this.digestService.load();
  }
}
