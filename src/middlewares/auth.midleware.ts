import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      const errPayload = new UnauthorizedException('Token invalid!');
      next(errPayload);
    }
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, decode: any): void | Response => {
        if (err) {
          const errPayload = new UnauthorizedException('Token invalid!');
          next(errPayload);
          return;
        }
        req.userId = decode.id;
        next();
      },
    );
  }
}
