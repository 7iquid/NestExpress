import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse CORS origins from env (support JSON array or comma-separated string)
  let allowedOrigins: string[] = [];
  try {
    allowedOrigins = JSON.parse(process.env.ALLOWED_CORS || '[]');
  } catch {
    allowedOrigins = (process.env.ALLOWED_CORS || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  }

  // Allow frontend requests
  app.enableCors({
    origin:
      allowedOrigins.length > 0 ? allowedOrigins : ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

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

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/v1`);
  console.log(
    `📄 Swagger docs available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap();
