import { ApolloDriver } from '@nestjs/apollo';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

//config
import { ConfigService } from './config/config.service';
import { IpMiddleware } from './cores/middleware/ip.middleware';
//custom modules
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { DateScalar } from './util/scalars/Date';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './cores/interceptors/logging.interceptor';
import { GlobalModule } from './global.module';
import { SchedulerService } from './util/scheduler.service';
import { PostModule } from './post/post.module';
import { DonationsModule } from './donations/donations.module';
import { ContestsModule } from './contests/contests.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.db,
        timezone: '+00:00',
        entities: [path.join(__dirname, '/**/*.entity.*s')],
        logging: process.env.NODE_ENV === 'dev',
        synchronize: false,
        // logging: false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '__graphql',
      debug: process.env.NODE_ENV === 'dev',
      playground: process.env.NODE_ENV === 'dev',
      introspection: process.env.NODE_ENV === 'dev',
    }),

    GlobalModule,
    HomeModule,
    UserModule,
    ScheduleModule.forRoot(),
    PostModule,
    DonationsModule,
    ContestsModule,
    BroadcastModule,
    ApplicationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    DateScalar,
    SchedulerService,
  ],
  exports: [DateScalar],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      IpMiddleware,
      // CookieParserMiddleware,
      // RateLimitMiddleware,
      // SlowDownMiddleware,
      // CompressionMiddleware,
    ];
    consumer
      .apply(...middlewares)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
