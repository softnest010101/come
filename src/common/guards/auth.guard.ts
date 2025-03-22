import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; role: string }; // ✅ ვამატებთ `user` ველს
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const secret = process.env.JWT_SECRET ?? 'default_secret';
      const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };
      request.user = decoded; // ✅ ახლა `request.user` არსებობს
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
