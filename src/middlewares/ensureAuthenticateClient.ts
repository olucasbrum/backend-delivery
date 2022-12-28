import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Ipayload {
  sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing',
    });
  }

  // [0] - Bearer
  // [1] - token
  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '202cb962ac59075b964b07152d234b70') as Ipayload;

    request.id_client = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid token!',
    });
  }
}
