"use server";

import { prisma } from "@/libs/prisma";

export async function getLocationByTableId(tableId: number) {
  const table = await prisma.tables.findFirst({ where: { id: tableId } });
  const location = await prisma.locations.findFirst({
    where: { id: Number(table?.locationId) },
  });
  console.log("location id is", table?.locationId);
  console.log("location is", location);

  return location;
}

export async function getCompanyByTableId(tableId: number) {
  const location = await getLocationByTableId(tableId);

  const company = await prisma.company.findFirst({
    where: { id: location?.companyId },
  });

  return company;
}

export async function getMenuCategoriesByTableId(tableId: number) {
  const company = await getCompanyByTableId(tableId);

  const location = await getLocationByTableId(tableId);

  const allMenuCategories = await prisma.menusCategories.findMany({
    where: { companyId: company?.id, isArchived: false },
  });

  const disableMenuCategoriesAndLocation =
    await prisma.disableMenuCategoriesAndLocations.findMany({
      where: { locationId: location?.id, isArchived: false },
    });
  const disableMenuCategoriesIds = disableMenuCategoriesAndLocation.map(
    (item) => item.menuCategoryId
  );

  const menusCategories = allMenuCategories.filter(
    (menuCategory) => !disableMenuCategoriesIds.includes(menuCategory.id)
  );

  console.log(menusCategories);
  return menusCategories;
}

export async function getMenusByMenuCategoryId(
  menuCategoryId: number,
  tableId: number
) {
  const menuCategories = await getMenuCategoriesByTableId(tableId);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const location = await getLocationByTableId(tableId);

  const menuCategoriesAndMenus = await prisma.menusCategoriesAndMenus.findMany({
    where: { menuCategoryIds: menuCategory?.id, isArchived: false },
  });

  const menuIds = menuCategoriesAndMenus.map((item) => item.menuId);

  const menusByMenuCategory = await prisma.menus.findMany({
    where: { id: { in: menuIds }, isArchived: false },
    include: { disableMenusAndLocations: true },
  });

  const disableMenus = menusByMenuCategory.filter((menu) =>
    menu.disableMenusAndLocations.find(
      (item) => item.menuId === menu.id && item.locationId === location?.id
    )
  );

  const disableMenuIds = disableMenus.map((item) => item.id);

  const menus = menusByMenuCategory.filter(
    (item) => !disableMenuIds.includes(item.id)
  );

  console.log("menusByMenuCategory are", menusByMenuCategory);
  console.log("disableMenus are", disableMenus);

  return menus;
}
