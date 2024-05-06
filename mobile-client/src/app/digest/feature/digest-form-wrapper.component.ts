import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { DigestType } from '../../shared/data-access/enum';
import { AugmentFormData } from '../../shared/data-access/type/form.type';
import { DigestService } from '../../shared/data-access/service/digest.service';
import { DigestEditDto } from '../../shared/data-access/dto/crud-digest.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type SubmitFormDto = {
  digest: { type: DigestType };
  dimensions: { [key: string]: unknown };
};

@Component({
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>{{ getTitle() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" style="{height: 100%}">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Add {{ selectedType$ | async }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="navigateTo(digestEntriesUrl)">Parcourir les entrées</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div class="digest-form-wrapper-container">
        <ion-list>
          <ion-item>
            <ion-select [value]="selectedType$ | async" (ionChange)="onTypeChange($event)" interface="action-sheet" placeholder="Type">
              @for (type of types$ | async; track type) {
              <ion-select-option [value]="type">{{ type | titlecase }}</ion-select-option>
              }
            </ion-select>
          </ion-item>
        </ion-list>

        <app-progress-bar [loaded]="(loaded$ | async)!">
          @if (formData$ | async; as formData) {
          <app-form-wrapper [editDto]="editDto?.digest" (formSubmit)="upsert($event)" [formData]="formData" />
          }
        </app-progress-bar>
      </div>
    </ion-content>
  `,
  styleUrl: './digest-form-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigestFormComponentWrapper {
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);
  private readonly digestService = inject(DigestService);

  public readonly digestEntriesUrl = 'tabs/digest';

  public readonly loaded$ = new BehaviorSubject<boolean>(false);
  public readonly selectedType$ = new BehaviorSubject<DigestType>(DigestType.QUOTE);
  public readonly types$ = of(Object.values(DigestType));

  public editDto: DigestEditDto | undefined = undefined;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const state = this.router.getCurrentNavigation()?.extras?.state;
        if (state) {
          this.editDto = state as DigestEditDto;
          this.selectedType$.next(state['selectedType']);
        } else {
          this.editDto = undefined;
          this.selectedType$.next(DigestType.QUOTE);
        }
      }
    });
  }

  public readonly formData$: Observable<AugmentFormData> = combineLatest([this.selectedType$]).pipe(
    tap(() => this.loaded$.next(false)),
    switchMap(([selectedType]) => this.httpClient.get<AugmentFormData>(`/assets/template/form/digest/${selectedType}-form.json`)),
    tap(() => {
      this.loaded$.next(true);
    })
  );

  onTypeChange(event: unknown): void {
    this.selectedType$.next((event as CustomEvent).detail.value);
  }

  upsert(event: {
    id: number | undefined;
    value: Partial<{
      [x: string]: any;
    }>;
  }): void {
    const newDigest = {
      digest: {
        type: this.selectedType$.getValue(),
      },
      dimensions: { ...(event.value as SubmitFormDto).dimensions },
    };
    newDigest.digest.type = this.selectedType$.getValue();
    this.digestService.customUpsert(newDigest, event.id);
    this.navigateTo(this.digestEntriesUrl);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  getTitle(): string {
    const mode = this.editDto ? 'Editer' : 'Ajouter';
    return `${mode} ${this.selectedType$.getValue()}`;
  }
}
