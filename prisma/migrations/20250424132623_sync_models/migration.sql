-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_pageId_fkey";

-- DropForeignKey
ALTER TABLE "WidgetInstance" DROP CONSTRAINT "WidgetInstance_pageId_fkey";

-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "config" DROP NOT NULL,
ALTER COLUMN "pageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WidgetInstance" ALTER COLUMN "config" DROP NOT NULL,
ALTER COLUMN "pageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
