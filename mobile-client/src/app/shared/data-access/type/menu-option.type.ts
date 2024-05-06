import { AugmentBaseObject } from './base.type';

export type MenuOption = AugmentBaseObject & {
  path: string;
  disabled?: boolean;
};
