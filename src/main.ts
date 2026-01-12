import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://chai-shots-qjmf-jmw7ip6ux-cmx1.vercel.app',
      'https://chai-shots-qjmf.vercel.app',
      'https://chai-shots-qjmf-73w55q80m-cmx1.vercel.app',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
