import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProjectModule } from "./project/project.module";
import { PageModule } from "./page/page.module";
import { ComponentModule } from "./component/component.module";
import { WidgetModule } from "./widget/widget.module";
import { ComponentInstanceModule } from "./component-instance/component-instance.module";
import { WidgetInstanceModule } from "./widget-instance/widget-instance.module";
import { CanvasModule } from "./canvas/canvas.module"; // ✅ დამატებულია

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    PrismaModule,
    ProjectModule,
    PageModule,
    ComponentModule,
    WidgetModule,
    ComponentInstanceModule,
    WidgetInstanceModule,
    CanvasModule, // ✅ აქ რეგისტრირდება
  ],
})
export class AppModule {}
