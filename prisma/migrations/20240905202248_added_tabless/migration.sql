/*
  Warnings:

  - Made the column `companyId` on table `MenusCategories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MenusCategories" DROP CONSTRAINT "MenusCategories_companyId_fkey";

-- AlterTable
ALTER TABLE "MenusCategories" ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MenusCategories" ADD CONSTRAINT "MenusCategories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
