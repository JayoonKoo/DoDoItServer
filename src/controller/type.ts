import { RequestHandler } from 'express';

export type ControllerType = {
  [k: string]: RequestHandler;
};
