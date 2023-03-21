import { Response, Request } from 'express';
import ErrorResponse from '../utils/errorResponse';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: Function
) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === 'dev') {
    // console.log(err);
  }

  if (err.name === 'CastError') {
    const message = `Cound not find resource.`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    // duplicate key
    const message = 'Duplicate field value';
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(
      (error: any) => error.message
    );
    error = new ErrorResponse(message[0], 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
