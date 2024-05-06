import { DigestType } from '../enum';

export type AugmentFormValidators = {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
};

export type AugmentFormControlOptions = {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
};

export type AugmentFormControlsType = 'text' | 'number' | 'textarea' | 'checkbox' | 'toggle';

export type AugmentFormControl = {
  name: `${DigestType}`;
  label: Capitalize<`${DigestType}`>;
  value: string;
  type: AugmentFormControlsType;
  options?: AugmentFormControlOptions;
  required: boolean;
  validators: AugmentFormValidators;
};

export type AugmentObjectGroups<T> = {
  [key: string]: T;
};

export type AugmentFormData = {
  [key: string]: AugmentFormControl[];
};
