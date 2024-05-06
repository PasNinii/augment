import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AugmentFormData, AugmentObjectGroups } from '../../data-access/type/form.type';
import { DigestType } from '../../data-access/enum';
import { Digest } from '../../data-access/type/digest.type';

@Component({
  selector: 'app-form-wrapper',
  template: `
    <form class="form-wrapper-container" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      @for (key of formDataKeys; track key) {
      <ng-container [formGroupName]="key">
        @for (control of formData[key]; track control.name) {
        <ion-item class="form-item-container">
          <app-form [control]="control" [form]="formGroup" [groupName]="key" />
        </ion-item>
        }
      </ng-container>
      }
      <ion-button class="form-item-container" expand="full" type="submit">Submit</ion-button>
    </form>
  `,
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormWrapperComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input({ required: true })
  formData!: AugmentFormData;

  @Input({ required: false })
  editDto: Digest | undefined;

  @Output()
  formSubmit = new EventEmitter<{
    id: number | undefined;
    value: Partial<{
      [x: string]: any;
    }>;
  }>();

  public formDataKeys: string[] = [];
  public formGroup = this.fb.group<AugmentObjectGroups<FormGroup>>({});

  ngOnChanges(_: SimpleChanges): void {
    this.formDataKeys = Object.keys(this.formData);
    this.formGroup = this.createForm(this.formData, this.editDto);
  }

  createForm(formData: AugmentFormData, editDto: any | undefined) {
    const groups: AugmentObjectGroups<FormGroup> = {};

    Object.keys(formData).forEach((key) => {
      const group: AugmentObjectGroups<FormControl> = {};

      formData[key].forEach((data) => {
        const value = editDto ? this.getDtoValue(data.name) : data.value;
        group[data.name] = new FormControl(value);
      });

      groups[key] = new FormGroup(group);
    });

    return new FormGroup(groups);
  }

  getDtoValue(value: `${DigestType}`): string | undefined {
    if (this.editDto?.dimensions) {
      return this.editDto.dimensions.find((element: any) => element.name === value)?.content;
    }

    return undefined;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const id = this.editDto?.id ?? undefined;
      this.formSubmit.emit({
        id,
        value: {
          id,
          ...this.formGroup.value,
        },
      });
    }
  }
}
