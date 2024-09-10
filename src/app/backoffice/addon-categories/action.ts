"use server";

import { prisma } from "@/libs/prisma";
import { AddonCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingAddonCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const isRequired = formData.get("isRequired") ? true : false;
  const selectedMenuIds: number[] = formData
    .getAll("menuId")
    .map((item) => Number(item));

  const addedAddonCategory = await prisma.addonCategories.create({
    data: { name, isRequired },
  });

  const data = selectedMenuIds.map((id) => ({
    menuId: id,
    addonCategoryId: addedAddonCategory.id,
  }));
  await prisma.addonCategoriesAndMenus.createMany({ data: data });

  redirect("/backoffice/addon-categories");
}

export async function updatingAddonCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const isRequired = formData.get("isRequired") ? true : false;

  const addonCategoryId = Number(formData.get("addonCategoryId"));

  const updatedMenuIds = formData.getAll("menuId").map((item) => Number(item));

  await prisma.addonCategories.update({
    data: { name, isRequired },
    where: { id: addonCategoryId },
  });

  const previousAddonCategoriesAndMenus =
    await prisma.addonCategoriesAndMenus.findMany({
      where: { addonCategoryId },
    });
  const previousMenuIds = previousAddonCategoriesAndMenus.map(
    (item) => item.menuId
  );

  const isSameMenuIds =
    updatedMenuIds.length === previousMenuIds.length &&
    updatedMenuIds.map((id) => previousMenuIds.includes(id));

  if (!isSameMenuIds) {
    const data = updatedMenuIds.map((id) => ({ menuId: id, addonCategoryId }));

    await prisma.addonCategoriesAndMenus.deleteMany({
      where: { addonCategoryId },
    });
    await prisma.addonCategoriesAndMenus.createMany({ data: data });
  }

  redirect("/backoffice/addon-categories");
}
export async function deleteAddonCategory(formData: any) {
  const id = Number(formData.get("addonCategoryId"));

  await prisma.addonCategoriesAndMenus.deleteMany({
    where: { addonCategoryId: id },
  });
  await prisma.addonCategories.delete({
    where: { id: id },
  });
  redirect("/backoffice/addon-categories");
}
