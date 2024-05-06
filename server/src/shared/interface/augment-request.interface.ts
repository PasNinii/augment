import { Request } from 'express';

export interface AugmentRequest extends Request {
  user: {
    sub: string;
  };
}
