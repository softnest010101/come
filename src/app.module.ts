import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ProjectModule } from './projects/project.module';
import { TemplateModule } from './templates/template.module';
import { WidgetModule } from './widgets/widget.module';
import { PageModule } from './pages/page.module';
import { ComponentModule } from './components/component.module'; // ✅ ComponentModule დამატებულია
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    UserModule,
    RoleModule,
    ProjectModule,
    TemplateModule,
    WidgetModule,
    PageModule,
    ComponentModule, // ✅ ComponentModule დამატებულია
  ],
  providers: [PrismaService],
})
export class AppModule {}
