import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AugmentFormControl } from '../../data-access/type/form.type';

@Component({
  selector: 'app-form',
  template: `
    <ng-container [formGroup]="form">
      <ng-container [formGroupName]="groupName">
        @if (control.label) {
        <ion-label>{{ control.label }}</ion-label>
        }
        <!---->
        @if (['text', 'number', 'url'].includes(control.type)) {
        <ion-input [type]="control.type" [formControlName]="control.name" [value]="control.value" />
        } @else if (control.type === 'textarea') {
        <ion-textarea [formControlName]="control.name" [value]="control.value" />
        } @else if (control.type === 'checkbox') {
        <ion-checkbox [formControlName]="control.name" [checked]="control.value" />
        } @else if (control.type === 'toggle') {
        <ion-toggle [formControlName]="control.name" [checked]="control.value" />
        }
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input() form!: any;
  @Input() groupName!: string;
  @Input() control!: AugmentFormControl;
}
