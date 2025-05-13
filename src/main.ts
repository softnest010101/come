// 📁 my-platform/src/main.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ აუცილებელია CORS-ის ჩართვა Next.js-თან მუშაობისთვის
  app.enableCors({
    origin: "http://localhost:3001", // შეცვალე საჭიროებისამებრ
    credentials: true,
  });

  app.setGlobalPrefix("api"); // ✅ საჭიროა რომ ყველა route იყოს /api/... ფორმატით

  const config = new DocumentBuilder()
    .setTitle("Backend API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, doc);

  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error("Error during application bootstrap:", err);
});
