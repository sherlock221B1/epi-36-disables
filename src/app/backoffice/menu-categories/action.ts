"use server";

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
  const id = formData.get("menuCategoryId");
  await prisma.menusCategories.update({
    data: { name: updatedMenuCategoryName },
    where: { id: Number(id) },
  });
  redirect("/backoffice/menu-categories");
}
export async function deleteMenuCategory(formData: any) {
  const id = formData.get("menuCategoryId");
  await prisma.menusCategories.delete({
    where: { id: Number(id) },
  });
  redirect("/backoffice/menu-categories");
}
