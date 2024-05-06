import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Digest } from '../../shared/data-access/type/digest.type';
import { DigestService } from '../../shared/data-access/service/digest.service';
import { DigestDetailComponent } from '../ui/digest-detail.component';
import { ConfirmComponent } from '../../shared/ui/dialog/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digest-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-progress-bar [loaded]="((digestService.loaded$ | async) && !(digestService.loading$ | async))!">
      @for(digest of digestService.entities$ | async; track digest.id) {
      <ion-list>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-sm="5">{{ digest.ctime | date : 'dd/MM/yyyy' }}</ion-col>
              <ion-col size="12" size-sm="5">{{ digest.type | titlecase }}</ion-col>
              <ion-col size="12" size-sm="5">{{ digest.dimensions[0].content }}</ion-col>
              <ion-col size="12" size-sm="2" align-self-end>
                <ion-button (click)="openDigestDetail(digest)" [color]="'success'">Detail</ion-button>
                <ion-button (click)="editDigest(digest)" [color]="'tertiary'">Edit</ion-button>
                <ion-button (click)="deleteDigest(digest)" [color]="'danger'">Delete</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
      }
    </app-progress-bar>
  `,
})
export class DigestListComponent {
  private readonly modalController = inject(ModalController);
  private readonly router = inject(Router);

  public readonly digestService = inject(DigestService);

  constructor() {
    this.digestService.load();
  }

  async openDigestDetail(digest: Digest): Promise<void> {
    const modal = await this.modalController.create({
      component: DigestDetailComponent,
      cssClass: 'augment-modal',
      componentProps: {
        entity: digest,
      },
    });

    modal.present();
  }

  public editDigest(digest: Digest): void {
    const extras = {
      state: {
        digest,
        selectedType: digest.type,
      },
    };

    this.router.navigate(['tabs/digest/edit'], extras);
  }

  async deleteDigest(digest: Digest): Promise<void> {
    const modal = await this.modalController.create({
      component: ConfirmComponent,
      cssClass: 'augment-modal',
    });

    modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.digestService.delete(digest);
    }
  }
}
