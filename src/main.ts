import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProfilesSeeder } from './modules/profiles/profiles.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for testing')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🔹 Seed profiles
  const seeder = app.get(ProfilesSeeder);
  await seeder.seed();

  await app.listen(3000);
  console.log(`🚀 Application running at http://localhost:3000/v1`);
  console.log(`📄 Swagger docs at http://localhost:3000/v1/api`);
}

bootstrap();
