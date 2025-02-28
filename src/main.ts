import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow cross-origin requests (e.g., from your frontend)
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('NestJS JWT Authentication')
    .setDescription('API documentation for JWT authentication example')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application
  await app.listen(3000);
}

bootstrap();
