import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { Digest } from '../../../shared/data-access/type/digest.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-swipe',
  template: `
    <ion-card class="card">
      <ion-card-header>
        <ion-card-subtitle>{{ digest.ctime | date : 'medium' }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row>
            @for (dimension of digest.dimensions; track dimension.id) {
            <ion-col size="12" size-sm="5"> {{ dimension.name | titlecase }}: {{ dimension.content }} </ion-col>
            }
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styleUrl: '../daily-digest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeComponent implements AfterViewInit {
  private readonly gestureCtrl = inject(GestureController);
  private readonly plt = inject(Platform);
  private readonly http = inject(HttpClient);

  @Input({ required: true }) digest!: Digest;
  @ViewChild(IonCard, { read: ElementRef }) digestEl!: ElementRef;

  ngAfterViewInit(): void {
    this.useTinderSwipe(this.digestEl);
  }

  useTinderSwipe(element: ElementRef<any>): void {
    const card = element;

    const gesture = this.gestureCtrl.create({
      el: card.nativeElement,
      gestureName: 'swipe',
      onMove: (event) => {
        card.nativeElement.style.transform = `translateX(${event.deltaX}px) rotate(${event.deltaX / 10}deg)`;
      },
      onEnd: (event) => {
        card.nativeElement.style.transition = '.5s ease-out';

        if (event.deltaX > 150) {
          card.nativeElement.style.transform = `translateX(${+this.plt.width() * 2}px) rotate(${event.deltaX / 10}deg)`;
          this.validation(true);
        } else if (event.deltaX < -150) {
          card.nativeElement.style.transform = `translateX(-${+this.plt.width() * 2}px) rotate(${event.deltaX / 10}deg)`;
          this.validation(false);
        } else {
          card.nativeElement.style.transform = '';
        }
      },
    });

    gesture.enable(true);
  }

  public validation(isValidated: boolean): void {
    this.http.put(`${environment.ENVIRONMENT_VARIABLES.audience}/api/digest/validation/${this.digest.id}`, { isValidated }).subscribe();
  }
}
