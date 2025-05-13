-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "ComponentInstance" ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "widgetId" INTEGER;

-- AlterTable
ALTER TABLE "Widget" ADD COLUMN     "componentId" INTEGER,
ADD COLUMN     "pageId" INTEGER,
ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "WidgetInstance" ADD COLUMN     "componentId" INTEGER,
ADD COLUMN     "componentInstanceId" INTEGER,
ADD COLUMN     "projectId" INTEGER;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentInstance" ADD CONSTRAINT "ComponentInstance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentInstance" ADD CONSTRAINT "ComponentInstance_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_componentInstanceId_fkey" FOREIGN KEY ("componentInstanceId") REFERENCES "ComponentInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
