"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addingAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const addonCategoryId = Number(formData.get("addonCategoryId"));

  await prisma.addons.create({
    data: { name, price, isAvailable, addonCategoryId },
  });

  redirect("/backoffice/addons");
}

export async function updatingAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const id = Number(formData.get("addonId"));
  const addonCategoryId = Number(formData.get("addonCategoryId"));

  await prisma.addons.update({
    data: { name, price, isAvailable, addonCategoryId },
    where: { id },
  });

  redirect("/backoffice/addons");
}

export async function deleteAddon(formData: FormData) {
  const id = Number(formData.get("addonId"));

  await prisma.addons.delete({
    where: { id },
  });

  redirect("/backoffice/addons");
}
