"use server";

import { prisma } from "@/libs/prisma";
import QRCode from "qrcode";
import { redirect } from "next/navigation";
import config from "@/config";
import { put } from "@vercel/blob";
import { Tables } from "@prisma/client";

export async function addingTable(formData: FormData) {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));

  const addedTable = await prisma.tables.create({
    data: { name, locationId, qrCodeImageUrl: "" },
  });

  const url = await createQrcodeImageUrl(addedTable);
  await prisma.tables.update({
    data: { ...addedTable, qrCodeImageUrl: url },
    where: { id: addedTable.id },
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

  await prisma.tables.update({
    data: { isArchived: true },
    where: { id: tableId },
  });
  redirect("/backoffice/tables");
}

export async function createQrcodeImageUrl(addedTable: Tables) {
  const orderAppUrl = `${config.orderAppUrl}?tableId=${addedTable.id}`;
  const qrCodeImage = await QRCode.toBuffer(orderAppUrl, { scale: 7 });
  const { url } = await put(
    `foodie-pos/table-${addedTable.id}.png`,
    qrCodeImage,
    {
      access: "public",
    }
  );

  return url;
}
