"use server";

import { getCurrentLocationId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { boolean, number, string, z } from "zod";

const FormSchema = z.object({
  id: z
    .number()
    .min(1, { message: "menuId is missing or menuId must be number" }),
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" }), // ensures name length is > 0,
  price: z.number({ message: "price must be number" }),
  isAvailable: z.boolean({ message: "isAvailable field is missing" }),
  selectedMenuCategoryIds: z
    .array(z.string())
    .min(1, "Menu must be connected with at least one menu category"),
});

const addingOrUpdatingMenuValidate = FormSchema.pick({
  name: true,
  selectedMenuCategoryIds: true,
});

export async function addingMenu(formData: FormData) {
  try {
    const { name, selectedMenuCategoryIds } =
      addingOrUpdatingMenuValidate.parse({
        name: formData.get("name"),
        selectedMenuCategoryIds: formData.getAll("menuCategoryId"),
      });

    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const imageUrl = formData.get("imageUrl") as string;

    const selectedAddonCategoryIds = formData.getAll("addonCategoryId");

    const addedMenu = await prisma.menus.create({
      data: { name, price, imageUrl: imageUrl ? imageUrl : "" },
    });

    //adding menusCategoriesAndMenus
    const dataForMenuCategoriesAndMenus: any = selectedMenuCategoryIds.map(
      (id) => ({
        menuId: addedMenu.id,
        menuCategoryIds: Number(id),
      })
    );
    await prisma.menusCategoriesAndMenus.createMany({
      data: dataForMenuCategoriesAndMenus,
    });

    // adding addonCategoriesAndMenus
    const dataForAddonCategoriesAndMenus: any = selectedAddonCategoryIds.map(
      (id) => ({
        menuId: addedMenu.id,
        addonCategoryId: Number(id),
      })
    );
    await prisma.addonCategoriesAndMenus.createMany({
      data: dataForAddonCategoriesAndMenus,
    });

    if (!isAvailable) {
      const currentLocationId = (await getCurrentLocationId()) as number;
      await prisma.disableMenusAndLocations.create({
        data: { menuId: addedMenu.id, locationId: currentLocationId },
      });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { errors: err.errors };
    } else {
      return {
        errors: [
          { message: "Something went wrong! Please contact our support team" },
        ],
      };
    }
  }
  return { error: null };
}

export async function updatingMenu(formData: FormData) {
  try {
    const { name, selectedMenuCategoryIds } =
      addingOrUpdatingMenuValidate.parse({
        name: formData.get("name"),
        selectedMenuCategoryIds: formData.getAll("menuCategoryId"),
      });

    const price = Number(formData.get("price"));
    const isAvailable = formData.get("isAvailable") ? true : false;
    const menuId = Number(formData.get("menuId"));

    const updatedMenuCategoryIds = selectedMenuCategoryIds;
    const updatedAddonCategoryIds = formData.getAll("addonCategoryId");

    const isCurrentNotAvailableMenu = Number(
      formData.get("isCurrentNotAvailableMenu")
    );

    const imageUrl = formData.get("imageUrl") as string;

    await prisma.menus.update({
      data: { name, price },
      where: { id: menuId },
    });

    if (imageUrl) {
      await prisma.menus.update({
        data: { imageUrl },
        where: { id: menuId },
      });
    }

    //Updating MenuCategories
    const previousMenuCategoriesAndMenus =
      await prisma.menusCategoriesAndMenus.findMany({ where: { menuId } });

    const previousMenuCategoryIds = previousMenuCategoriesAndMenus.map(
      (item) => item.menuCategoryIds
    );

    const isSameMenuCategoryIds =
      updatedMenuCategoryIds.length === previousMenuCategoryIds.length &&
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

    //Updating Addon Categoreis
    const previousAddonCategoriesAndMenus =
      await prisma.addonCategoriesAndMenus.findMany({ where: { menuId } });

    const previousAddonCategoryIds = previousAddonCategoriesAndMenus.map(
      (item) => item.addonCategoryId
    );

    const isSameAddonCategoryIds =
      updatedAddonCategoryIds.length === previousAddonCategoryIds.length &&
      updatedAddonCategoryIds.every((id) =>
        previousAddonCategoryIds.includes(Number(id))
      );

    if (!isSameAddonCategoryIds) {
      const data: any = updatedAddonCategoryIds.map((id) => ({
        menuId: menuId,
        addonCategoryId: Number(id),
      }));

      await prisma.addonCategoriesAndMenus.deleteMany({
        where: { menuId: menuId },
      });
      await prisma.addonCategoriesAndMenus.createMany({ data: data });
    }

    if (isAvailable) {
      if (isCurrentNotAvailableMenu) {
        await prisma.disableMenusAndLocations.delete({
          where: { id: isCurrentNotAvailableMenu },
        });
      }
    } else {
      if (!isCurrentNotAvailableMenu) {
        const currentLocationId = (await getCurrentLocationId()) as number;
        await prisma.disableMenusAndLocations.create({
          data: { menuId, locationId: currentLocationId },
        });
      }
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorMessage = err.errors.map((error) => error.message).join(",");
      return { error: errorMessage };
    } else {
      return { error: "Something went wrong! Please contact our support team" };
    }
  }
  redirect("/backoffice/menus");
}

export async function deleteMenu(formData: FormData) {
  const menuId = Number(formData.get("menuId"));

  await prisma.menusCategoriesAndMenus.updateMany({
    data: { isArchived: true },
    where: { menuId },
  });
  await prisma.addonCategoriesAndMenus.deleteMany({ where: { menuId } });
  await prisma.disableMenusAndLocations.deleteMany({ where: { menuId } });
  await prisma.menus.update({
    data: { isArchived: true },
    where: { id: menuId },
  });

  redirect("/backoffice/menus");
}
