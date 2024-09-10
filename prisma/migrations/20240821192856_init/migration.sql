-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "isAvailable" BOOLEAN DEFAULT true,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenusCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MenusCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenusCategoriesAndMenus" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "menuCategoryIds" INTEGER NOT NULL,

    CONSTRAINT "MenusCategoriesAndMenus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenusCategoriesAndMenus" ADD CONSTRAINT "MenusCategoriesAndMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusCategoriesAndMenus" ADD CONSTRAINT "MenusCategoriesAndMenus_menuCategoryIds_fkey" FOREIGN KEY ("menuCategoryIds") REFERENCES "MenusCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
