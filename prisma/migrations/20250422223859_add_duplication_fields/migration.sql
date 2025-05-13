/*
  Warnings:

  - Added the required column `config` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `config` to the `WidgetInstance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `WidgetInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "config" JSONB NOT NULL,
ADD COLUMN     "pageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WidgetInstance" ADD COLUMN     "config" JSONB NOT NULL,
ADD COLUMN     "pageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
