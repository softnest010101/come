-- AlterTable
ALTER TABLE "WidgetInstance" ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "Canvas" (
    "id" SERIAL NOT NULL,
    "tools" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);
