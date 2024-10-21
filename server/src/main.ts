import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bootstrap from './bootstrap';

declare const module: any;

export async function main() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'dev' ? new Logger() : false,
  });
  await bootstrap(app);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

main();
