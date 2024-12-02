import { NextFunction, Request, Response } from 'express';

export interface ExecptionFilter {
  catch(error: Error, request: Request, response: Response, next: NextFunction): void;
}
