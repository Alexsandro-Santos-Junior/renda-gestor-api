// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app.module';
// import { ZodFilter } from './shared/filters/zod.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors();
//   app.useGlobalFilters(new ZodFilter());

//   await app.listen(process.env.PORT || 3000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { ZodFilter } from './shared/filters/zod.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.use(
    json({
      limit: '50mb',
      verify(req: any, res, buf) {
        req.rawBody = buf.toString('utf-8');
      },
    }),
  );

  app.enableCors();
  app.useGlobalFilters(new ZodFilter());

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
