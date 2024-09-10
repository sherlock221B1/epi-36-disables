/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Menus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menus" DROP COLUMN "isAvailable";

-- CreateTable
CREATE TABLE "DisableMenusAndLocations" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DisableMenusAndLocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisableMenuCategoriesAndLocations" (
    "id" SERIAL NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DisableMenuCategoriesAndLocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisableMenusAndLocations" ADD CONSTRAINT "DisableMenusAndLocations_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableMenusAndLocations" ADD CONSTRAINT "DisableMenusAndLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableMenuCategoriesAndLocations" ADD CONSTRAINT "DisableMenuCategoriesAndLocations_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenusCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableMenuCategoriesAndLocations" ADD CONSTRAINT "DisableMenuCategoriesAndLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
