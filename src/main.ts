import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional: set a global prefix if you're versioning your API
  app.setGlobalPrefix('v1');

  // 🔧 Enable global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in DTO
      forbidNonWhitelisted: true, // throw error on extra properties
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  // 🔧 Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for testing')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000/v1`);
  console.log(`📄 Swagger docs available at: http://localhost:3000/api/docs`);
}

bootstrap();
