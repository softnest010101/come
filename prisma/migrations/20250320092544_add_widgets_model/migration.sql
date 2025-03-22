/*
  Warnings:

  - You are about to drop the column `properties` on the `Widget` table. All the data in the column will be lost.
  - Added the required column `settings` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Widget_name_key";

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "properties",
ADD COLUMN     "settings" JSONB NOT NULL;
