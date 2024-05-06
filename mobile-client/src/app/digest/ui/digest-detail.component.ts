import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Digest } from '../../shared/data-access/type/digest.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digest-detail',
  styleUrl: './digest-detail.component.scss',
  template: `
    <div class="augment-modal-wrapper">
      @if (digest) {
      <h1>Content</h1>
      @for(dimension of digest.dimensions; track dimension.id) {
      <p>{{ dimension.name | titlecase }}: {{ dimension.content }}</p>
      }

      <h1>History</h1>
      <div class="augment-modal-digest-history">
        @for (d of history; track d.id) {
        <p>
          <!---->
          {{ d.vtime | date : 'dd/MM/yyyy' }}
          @if (d.isValidated) {
          <ion-icon name="checkmark-outline" />
          } @else {
          <ion-icon name="close-outline" />
          }
        </p>
        }
      </div>
      }
      <ion-button (click)="confirm()">Fermer</ion-button>
    </div>
  `,
})
export class DigestDetailComponent {
  private readonly modalController = inject(ModalController);
  private readonly http = inject(HttpClient);

  public history: any = undefined;

  public digest: Digest | undefined = undefined;

  public set entity(d: Digest) {
    this.digest = d;
    this.http.get(`${environment.ENVIRONMENT_VARIABLES.audience}/api/digest/history/${d.id}`).subscribe((h) => (this.history = h));
  }

  confirm(): void {
    this.modalController.dismiss();
  }
}
