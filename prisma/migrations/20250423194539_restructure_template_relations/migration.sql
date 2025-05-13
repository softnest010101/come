-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_projectId_fkey";

-- AlterTable
ALTER TABLE "ComponentInstance" ADD COLUMN     "componentId" INTEGER,
ADD COLUMN     "config" JSONB,
ADD COLUMN     "pageId" INTEGER;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "templateId" INTEGER,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WidgetInstance" ADD COLUMN     "widgetId" INTEGER;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentInstance" ADD CONSTRAINT "ComponentInstance_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentInstance" ADD CONSTRAINT "ComponentInstance_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE SET NULL ON UPDATE CASCADE;
