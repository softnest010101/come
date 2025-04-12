import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // Enable validation globally
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('COME API')
    .setDescription('API documentation for COME platform') // Updated description
    .setVersion('1.0')
    .addBearerAuth() // ✅ ეს საჭიროა Authorize ღილაკისთვის
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger on /api

  const port = 3000; // Explicitly set to 3001
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
