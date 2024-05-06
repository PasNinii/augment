import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="augment-modal-wrapper">
      <p>Etes vous certains de votre choix ?</p>
      <ion-button [color]="'medium'" (click)="confirm(false)">No</ion-button>
      <ion-button [color]="'danger'" (click)="confirm(true)">Yes</ion-button>
    </div>
  `,
})
export class ConfirmComponent {
  private readonly modalController = inject(ModalController);

  confirm(choiceConfirmed: boolean = false) {
    return this.modalController.dismiss(null, choiceConfirmed ? 'confirm' : 'cancel');
  }
}
