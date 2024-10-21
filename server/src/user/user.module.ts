import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';
import { CommonOAuth2 } from '../cores/oauth/common.oauth2';
import { GoogleOAuth } from '../cores/oauth/google.oauth';
import { JwtStrategy } from '../cores/strategies/jwt.strategy';
import { AWSService } from '../util/aws.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserProfile } from './userProfile.entity';
import { UserToken } from './userToken.entity';
import { GoogleCustomStrategy } from '../cores/strategies/custom-google-strategy';
import { KakaoCustomStrategy } from '../cores/strategies/custom-kakao-strategy';
import { NaverCustomStrategy } from '../cores/strategies/custom-naver-strategy';
import { CacheService } from '../util/cache.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserToken]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.auth.jwtSecret,
        signOptions: { expiresIn: configService.auth.jwtExpiresIn },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register(),
  ],
  providers: [
    UserController,
    UserService,
    GoogleOAuth,
    CommonOAuth2,
    JwtStrategy,
    GoogleCustomStrategy,
    KakaoCustomStrategy,
    NaverCustomStrategy,
    ConfigService,
    AWSService,
    CacheService,
  ],
  controllers: [UserController],
  exports: [UserService, GoogleOAuth, CommonOAuth2],
})
export class UserModule {}
