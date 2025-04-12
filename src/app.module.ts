import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { PageModule } from './page/page.module'; // Import PageModule
import { ComponentModule } from './component/component.module'; // Import ComponentModule
import { WidgetModule } from './widget/widget.module'; // Import WidgetModule
import { WidgetInstanceModule } from './widget-instance/widget-instance.module'; // Import WidgetInstanceModule
import { TemplateModule } from './template/template.module'; // Import TemplateModule

@Module({
  imports: [
    TemplateModule, // Added TemplateModule
    WidgetInstanceModule, // Added WidgetInstanceModule
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProjectModule,
    PageModule, // Add PageModule to imports
    ComponentModule, // Add ComponentModule to imports
    WidgetModule, // Add WidgetModule to imports
  ],
})
export class AppModule {}
