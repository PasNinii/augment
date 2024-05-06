import { DimensionType } from '../../shared/enum/dimension-type';

export class CreateDimensionDto {
  name: string;
  content: string;
  type: DimensionType;
}
