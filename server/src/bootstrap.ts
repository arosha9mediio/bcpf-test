import * as admin from 'firebase-admin';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import { ConfigService } from './config/config.service';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ErrorCode } from './constants/error';

export default async function bootstrap(app) {
  const configService: ConfigService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // console.log({ errors: errors?.[0] });
        const fields = {};
        errors.forEach((error) => {
          fields[error.property] =
            error.constraints[Object.keys(error.constraints)[0]];
        });
        return new HttpException(
          {
            ...ErrorCode.ParamsError,
            fields,
          },
          HttpStatus.OK
        );
      },
    })
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const viewPath = join(__dirname, './views');
  console.log('viewPath >>> ', viewPath);
  app.setBaseViewsDir(viewPath);
  app.setViewEngine('njk');
  nunjucks.configure(viewPath, {
    noCache: true,
    autoescape: true,
    express: app,
  });
  // const serviceAccount = require("./firebaseServiceAccountKey.json");
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });

  const { port } = configService;
  await app.listen(port);
  console.log(`Nest application successfully started on port: ${port}`);
  console.log(
    process.env.NODE_ENV === 'dev'
      ? `playground -> http://localhost:${port}/__graphql`
      : ''
  );
}
