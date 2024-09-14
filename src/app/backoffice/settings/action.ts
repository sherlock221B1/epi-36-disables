"use server";

import { getCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getCompany() {
  const companyId = await getCompanyId();
  return await prisma.company.findFirst({ where: { id: companyId } });
}

export async function updatingCompany(formDate: FormData) {
  const name = formDate.get("name") as string;
  const id = Number(formDate.get("id"));

  await prisma.company.update({ data: { name }, where: { id } });

  redirect("/backoffice");
}
