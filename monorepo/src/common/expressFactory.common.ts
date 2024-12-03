import { Request, Response, NextFunction } from 'express';
import { Response as ResponseType } from './types.common';

type Controller = (...props: any[]) => Promise<ResponseType>;
type ExpressRequestTransformer = (req: Request) => any;

export function factory(
  reqTransformer: ExpressRequestTransformer | null,
  controllerFn: Controller,
) {
  return async (req: Request, res: Response): Promise<void> => {
    let props: any;
    let result: ResponseType;

    if (reqTransformer !== null) {
      props = reqTransformer(req);
      result = await controllerFn(props);
    } else {
      result = await controllerFn();
    }

    res.status(result.statusCode).json(result.body);
  };
}
