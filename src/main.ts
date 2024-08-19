import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
<<<<<<< HEAD
=======

>>>>>>> 47764a701b63d8b8e63fe62abf0c55f578c2ccf1

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
<<<<<<< HEAD
    credentials: true, 
  };
=======
    credentials: true, // If you need to support credentials (cookies, etc.)
  };

  app.enableCors(corsOptions);

>>>>>>> 47764a701b63d8b8e63fe62abf0c55f578c2ccf1
  await app.listen(3000);
}
bootstrap();
