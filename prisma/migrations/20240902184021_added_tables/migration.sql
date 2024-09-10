-- CreateTable
CREATE TABLE "AddonCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AddonCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddonCategoriesAndMenus" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,

    CONSTRAINT "AddonCategoriesAndMenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "addonCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddonCategoriesAndMenus" ADD CONSTRAINT "AddonCategoriesAndMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddonCategoriesAndMenus" ADD CONSTRAINT "AddonCategoriesAndMenus_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
