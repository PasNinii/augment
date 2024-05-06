import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AugmentBaseObject, MenuOption } from '../../shared/data-access/type';

@Component({
  selector: 'app-tab-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title> {{ getComponentName() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ getComponentName() }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="tab-home_menu-option_container">
        @for(menuOption of getMenuOptions() | async; track menuOption.id) {
        <ng-container>
          <ion-card (click)="navigateTo(menuOption.path)" [disabled]="menuOption.disabled">
            <ion-card-header>
              <ion-card-title>{{ menuOption.title }}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </ng-container>
        }
      </div>
    </ion-content>
  `,
  styleUrl: './tab-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabHomePage {
  private static readonly COMPONENT_NAME = 'Home';
  private static readonly MENU_OPTIONS$ = of<MenuOption[]>([
    { id: 0, title: 'Nouvelle entrée', path: 'tabs/digest/edit' },
    { id: 1, title: 'Parcourir les entrées', path: 'tabs/digest' },
    { id: 2, title: 'Daily digest (alpha)', path: '' },
    { id: 3, title: 'Dive in the digest (in dev)', path: '', disabled: true },
  ]);

  constructor(private readonly router: Router) {}

  getComponentName() {
    return TabHomePage.COMPONENT_NAME;
  }

  getMenuOptions() {
    return TabHomePage.MENU_OPTIONS$;
  }

  navigateTo(path: string | undefined) {
    if (path) {
      this.router.navigate([path]);
    }
  }
}
