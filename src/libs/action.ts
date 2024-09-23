"use server";

import { getServerSession, User } from "next-auth";
import { prisma } from "./prisma";
import { Addons, MenusCategories } from "@prisma/client";
import exp from "constants";
import { it } from "node:test";
import { createQrcodeImageUrl } from "@/app/backoffice/tables/action";

export async function createDefaultData(nextUser: User) {
  const { name, email } = nextUser;

  const company = await prisma.company.create({
    data: { name: "Default Company" },
  });

  const user = await prisma.users.create({
    data: {
      name: name as string,
      email: email as string,
      companyId: company.id,
    },
  });

  const menuCategory = await prisma.menusCategories.create({
    data: { name: "Default MenuCategory", companyId: company.id },
  });

  const menu = await prisma.menus.create({
    data: { name: "Default Menu", imageUrl: "" },
  });

  const menuCategoriesAndMenus = await prisma.menusCategoriesAndMenus.create({
    data: { menuId: menu.id, menuCategoryIds: menuCategory.id },
  });

  const addonCategory = await prisma.addonCategories.create({
    data: { name: "Defrult AddonCategory" },
  });

  const addonCategoriesAndMenus = await prisma.addonCategoriesAndMenus.create({
    data: { menuId: menu.id, addonCategoryId: addonCategory.id },
  });

  const addonNames = ["Default Addon 1", "Default Addon 2", "Default Addon 3"];
  const data = addonNames.map((addonName) => ({
    name: addonName,
    addonCategoryId: addonCategory.id,
  }));
  const addons = await prisma.addons.createMany({ data: data });

  const location = await prisma.locations.create({
    data: { name: "Default Location", companyId: company.id },
  });

  const table = await prisma.tables.create({
    data: {
      name: "Defatult Table",
      locationId: location.id,
      qrCodeImageUrl: "",
    },
  });

  const url = await createQrcodeImageUrl(table);
  await prisma.tables.update({
    data: { ...table, qrCodeImageUrl: url },
    where: { id: table.id },
  });

  await prisma.userAndSelectedLocation.create({
    data: { userId: user.id, locationId: location.id },
  });
}

export async function getCompanyId() {
  const session = await getServerSession();
  const user = session?.user;

  const userFromDB = await prisma.users.findFirst({
    where: { email: user?.email as string },
  });

  const company = await prisma.company.findFirst({
    where: { id: userFromDB?.companyId },
  });

  return company?.id;
}
export async function getUserId() {
  const session = await getServerSession();
  const user = session?.user;

  const userFromDB = await prisma.users.findFirst({
    where: { email: user?.email as string },
  });

  return userFromDB?.id;
}

export async function getMenuCategoriesByCompanyId() {
  const companyId = await getCompanyId();
  const menuCategories = await prisma.menusCategories.findMany({
    where: { companyId, isArchived: false },
    include: { disableMenuCategoriesAndLocations: true },
    orderBy: { id: "asc" },
  });

  return menuCategories;
}

export async function getMenusByCompanyId() {
  const menuCategories: MenusCategories[] =
    await getMenuCategoriesByCompanyId();
  const menuCategoryIds = menuCategories.map((item) => item.id);

  const menuCategoriesAndMenus = await prisma.menusCategoriesAndMenus.findMany({
    where: { menuCategoryIds: { in: menuCategoryIds } },
  });
  const menuIds = menuCategoriesAndMenus.map((item) => item.menuId);

  const menus = await prisma.menus.findMany({
    where: { id: { in: menuIds }, isArchived: false },
    include: { disableMenusAndLocations: true },
    orderBy: { id: "asc" },
  });

  return menus;
}

export async function getAddonCategoriesByCompanyId() {
  const menus = await getMenusByCompanyId();
  const menuIds = menus.map((menu) => menu.id);

  const addonCategoriesAndMenus = await prisma.addonCategoriesAndMenus.findMany(
    { where: { menuId: { in: menuIds } } }
  );
  const addonCategoryIds = addonCategoriesAndMenus.map(
    (item) => item.addonCategoryId
  );

  const addonCategories = await prisma.addonCategories.findMany({
    where: { id: { in: addonCategoryIds }, isArchived: false },
    orderBy: { id: "asc" },
  });
  return addonCategories;
}

export async function getAddonsByCompanyId() {
  const addonCategories = await getAddonCategoriesByCompanyId();
  const addonCategoryIds = addonCategories.map((item) => item.id);

  const addons = await prisma.addons.findMany({
    where: { addonCategoryId: { in: addonCategoryIds }, isArchived: false },
    orderBy: { id: "asc" },
  });
  return addons;
}

export async function getLocationsByCompanyId() {
  const companyId = await getCompanyId();
  const locations = await prisma.locations.findMany({
    where: { companyId, isArchived: false },
    orderBy: { id: "asc" },
  });
  return locations;
}

export async function getTablesByCompanyId() {
  const locations = await getLocationsByCompanyId();
  const locationIds = locations.map((item) => item.id);

  const tables = await prisma.tables.findMany({
    where: { locationId: { in: locationIds }, isArchived: false },
    orderBy: { id: "asc" },
  });

  return tables;
}

export async function getTablesByLocationId() {
  const currentLocationId = (await getCurrentLocationId()) as number;

  const tables = await prisma.tables.findMany({
    where: { locationId: currentLocationId, isArchived: false },
    orderBy: { id: "asc" },
  });

  return tables;
}

export async function getCurrentUserAndSelectedLocation() {
  const userId = await getUserId();
  const currentUserAndSelectedLocation =
    await prisma.userAndSelectedLocation.findFirst({
      where: { userId },
    });
  return currentUserAndSelectedLocation;
}

export async function getCurrentLocationId() {
  const currentUserAndSelectedLocation =
    await getCurrentUserAndSelectedLocation();
  const currentLocationId = currentUserAndSelectedLocation?.locationId;
  return currentLocationId;
}

export async function getCurrentLocation() {
  const locations = await getLocationsByCompanyId();

  const currentLocationId = await getCurrentLocationId();
  const currentLocation = locations.find(
    (location) => location.id === currentLocationId
  );
  return currentLocation;
}
