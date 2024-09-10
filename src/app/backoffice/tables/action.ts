"use server";

import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingTable(formData: FormData) {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  const added = await prisma.tables.create({
    data: { name, locationId },
  });

  redirect("/backoffice/tables");
}

export async function updatingTable(formData: FormData) {
  const name = formData.get("name") as string;
  const tableId = Number(formData.get("tableId"));

  await prisma.tables.update({
    data: { name },
    where: { id: tableId },
  });

  redirect("/backoffice/tables");
}

export async function deleteTable(formData: FormData) {
  const tableId = Number(formData.get("tableId"));

  await prisma.tables.delete({ where: { id: tableId } });
  redirect("/backoffice/tables");
}
