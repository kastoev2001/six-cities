import { HttpMethod } from './http-mothod.enum.js';
import { Response, Request, NextFunction } from 'express';

export interface Route {
  path: string;
  method: HttpMethod
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
