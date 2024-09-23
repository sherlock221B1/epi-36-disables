/*
  Warnings:

  - Made the column `imageUrl` on table `Menus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menus" ALTER COLUMN "imageUrl" SET NOT NULL;
