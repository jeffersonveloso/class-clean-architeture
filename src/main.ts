import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app/app.module';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const server: express.Express = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

async function bootstrap(expressInstance: express.Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Baileys Server')
    .setDescription('Backend Baileys')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.init();
  await app.listen(3000);
}

bootstrap(server);
