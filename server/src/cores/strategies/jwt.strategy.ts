import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import express from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.auth.jwtSecret,
    });
  }

  authenticate(req: express.Request, options?: any) {
    super.authenticate(req, options);
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userService.findUserById(
      payload.sub,
      0,
      'jwt',
      null
    );
    return user;
  }
}
