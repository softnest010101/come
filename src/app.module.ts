import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "./prisma/prisma.module"; // Import PrismaModule
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { PageModule } from "./page/page.module";
import { ComponentModule } from "./component/component.module";
import { WidgetModule } from "./widget/widget.module";
import { WidgetInstanceModule } from "./widget-instance/widget-instance.module";
import { TemplateModule } from "./template/template.module";
import { ComponentInstanceModule } from "./component-instances/component-instance.module"; // Corrected path

@Module({
  imports: [
    PrismaModule, // Added PrismaModule
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    PageModule,
    ComponentModule,
    WidgetModule,
    WidgetInstanceModule,
    TemplateModule,
    ComponentInstanceModule, // Added ComponentInstanceModule
  ],
})
export class AppModule {}
