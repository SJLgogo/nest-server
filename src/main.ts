import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/intercaptors.ts/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    bufferLogs: true,
  });
  app.enableCors()
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    transform:true, 
    whitelist:true,   
  }));
  await app.listen(4000);
}
bootstrap();
