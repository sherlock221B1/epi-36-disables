"use server";

import { getCurrentLocationId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addingMenuCategory(formData: any) {
  const addedMenuCategoryName = formData.get("addedMenuCategoryName");
  const companyId = Number(formData.get("companyId"));
  await prisma.menusCategories.create({
    data: { name: addedMenuCategoryName, companyId },
  });
  redirect("/backoffice/menu-categories");
}

export async function updatingMenuCategory(formData: any) {
  const updatedMenuCategoryName = formData.get("updatedMenuCategoryName");
  const menuCategoryId = Number(formData.get("menuCategoryId"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const isCurrentNotAvailableMenuCategory = Number(
    formData.get("isCurrentNotAvailableMenuCategory")
  );
  const currentLocationId = (await getCurrentLocationId()) as number;

  await prisma.menusCategories.update({
    data: { name: updatedMenuCategoryName },
    where: { id: menuCategoryId },
  });

  if (isAvailable) {
    if (isCurrentNotAvailableMenuCategory) {
      await prisma.disableMenuCategoriesAndLocations.delete({
        where: { id: isCurrentNotAvailableMenuCategory },
      });
    }
  } else {
    if (!isCurrentNotAvailableMenuCategory) {
      await prisma.disableMenuCategoriesAndLocations.create({
        data: { menuCategoryId, locationId: currentLocationId },
      });
    }
  }

  redirect("/backoffice/menu-categories");
}
export async function deleteMenuCategory(formData: any) {
  const menuCategoryId = Number(formData.get("menuCategoryId"));

  await prisma.menusCategoriesAndMenus.deleteMany({
    where: { menuCategoryIds: menuCategoryId },
  });
  await prisma.disableMenuCategoriesAndLocations.deleteMany({
    where: { menuCategoryId },
  });

  await prisma.menusCategories.update({
    data: { isArchived: true },
    where: { id: menuCategoryId },
  });
  redirect("/backoffice/menu-categories");
}
