import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'supersecret', // Ensure this matches your .env file
    });
  }

  validate(payload: JwtPayload) {
    // Attach the payload to the request as `req.user`
    return { id: payload.userId, email: payload.email, role: payload.role };
  }
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
