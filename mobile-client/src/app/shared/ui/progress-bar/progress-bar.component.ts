import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

export type ProgressBarColor = 'danger' | 'dark' | 'light' | 'medium' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';

export type ProgressBarType = 'determinate' | 'indeterminate';

@Component({
  selector: `app-progress-bar`,
  template: `
    @if (loaded) {
    <ng-content />
    } @else {
    <ion-progress-bar [type]="type" />
    }
  `,
  standalone: true,
  imports: [IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() type: ProgressBarType = 'indeterminate';
  @Input() color: ProgressBarColor = 'primary';
  @Input() loaded: boolean = true;
}
