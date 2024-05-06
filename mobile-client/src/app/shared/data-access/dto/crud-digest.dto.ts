import { DigestType } from '../enum';
import { Digest } from '../type/digest.type';

export interface EditDto {
  selectedType: unknown;
  entity: unknown;
}

export type DigestEditDto = {
  selectedType: DigestType;
  digest: Digest;
};
