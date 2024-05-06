import { DigestType } from '../enum';
import { DimensionType } from '../enum/dimension-type.enum';

export type Dimension = {
  id: number;
  type: DimensionType;
  content: string;
  order: number;
  digestId: number;
  name: string;
};

export type DimensionDto = Partial<Dimension>;

export type Digest = {
  id: number;
  ctime: Date;
  mtime: Date;
  type: DigestType;
  name: string;
  dimensions: Dimension[] | DimensionDto[];
  userId: string;
};
