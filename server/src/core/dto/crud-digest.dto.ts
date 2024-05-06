import { DigestType } from '../../shared/enum/digest-type.enum';
import { CreateDimensionDto } from './crud-dimension.dto';

export class CreateDigestDto {
  name: string;
  dimensions: CreateDimensionDto[];
  type: DigestType;
  userId?: string;
}

export class UpdateDigestDto extends CreateDigestDto {
  id: number;
}
