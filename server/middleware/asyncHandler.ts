import { Response, Request } from 'express';

const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: Function) => {
    fn(req, res, next).catch(next);
  };
};

export { asyncHandler }