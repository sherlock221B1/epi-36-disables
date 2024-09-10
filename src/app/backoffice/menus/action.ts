"use server";

import { getCurrentLocationId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const selectedMenuCategoryIds = formData.getAll("menuCategoryId");

  const addedMenu = await prisma.menus.create({
    data: { name, price },
  });

  const data: any = selectedMenuCategoryIds.map((id) => ({
    menuId: addedMenu.id,
    menuCategoryIds: Number(id),
  }));
  await prisma.menusCategoriesAndMenus.createMany({ data: data });

  if (!isAvailable) {
    const currentLocationId = (await getCurrentLocationId()) as number;
    await prisma.disableMenusAndLocations.create({
      data: { menuId: addedMenu.id, locationId: currentLocationId },
    });
  }
  redirect("/backoffice/menus");
}

export async function updatingMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const menuId = Number(formData.get("menuId"));
  const updatedMenuCategoryIds = formData.getAll("menuCategoryId");
  const isCurrentNotAvailableMenu = Number(
    formData.get("isCurrentNotAvailableMenu")
  );

  await prisma.menus.update({
    data: { name, price },
    where: { id: menuId },
  });

  const previousMenuCategoriesAndMenus =
    await prisma.menusCategoriesAndMenus.findMany({ where: { menuId } });
  const previousMenuCategoryIds = previousMenuCategoriesAndMenus.map(
    (item) => item.menuCategoryIds
  );

  const isSameMenuCategoryIds =
    updatedMenuCategoryIds.length === previousMenuCategoriesAndMenus.length &&
    updatedMenuCategoryIds.every((id) =>
      previousMenuCategoryIds.includes(Number(id))
    );

  if (!isSameMenuCategoryIds) {
    const data: any = updatedMenuCategoryIds.map((id) => ({
      menuId: menuId,
      menuCategoryIds: Number(id),
    }));

    await prisma.menusCategoriesAndMenus.deleteMany({
      where: { menuId: menuId },
    });
    await prisma.menusCategoriesAndMenus.createMany({ data: data });
  }

  if (isAvailable) {
    if (isCurrentNotAvailableMenu) {
      await prisma.disableMenusAndLocations.delete({
        where: { id: isCurrentNotAvailableMenu },
      });
    }
  } else {
    {
      !isCurrentNotAvailableMenu;
    }
    {
      const currentLocationId = (await getCurrentLocationId()) as number;
      await prisma.disableMenusAndLocations.create({
        data: { menuId, locationId: currentLocationId },
      });
    }
  }
  redirect("/backoffice/menus");
}

export async function deleteMenu(formData: FormData) {
  const menuId = Number(formData.get("menuId"));

  await prisma.menusCategoriesAndMenus.deleteMany({ where: { menuId } });
  await prisma.addonCategoriesAndMenus.deleteMany({ where: { menuId } });
  await prisma.menus.delete({
    where: { id: menuId },
  });

  redirect("/backoffice/menus");
}
