import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { deleteMenu, updatingMenu } from "../action";
import {
  getCurrentLocation,
  getCurrentLocationId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import { upload } from "@vercel/blob/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UpdatingMenuPage from "@/components/UpdatingMenuPage";

interface Props {
  params: {
    menuId: string;
  };
}

export default async function UpdatingMenu({ params }: Props) {
  const menuId = Number(params.menuId);

  const menuCategories = await getMenuCategoriesByCompanyId();
  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { menusCategoriesAndMenus: true, disableMenusAndLocations: true },
  });

  const selectedMenuCategoryIds =
    menuToBeUpdatedOrDeleted?.menusCategoriesAndMenus.map(
      (item) => item.menuCategoryIds
    );

  const currentLocationId = await getCurrentLocationId();
  const isCurrentNotAvailableMenu =
    menuToBeUpdatedOrDeleted?.disableMenusAndLocations.find(
      (item) =>
        item.menuId === menuToBeUpdatedOrDeleted.id &&
        item.locationId === currentLocationId
    );

  if (!menuToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <UpdatingMenuPage
      menuId={menuId}
      menuToBeUpdatedOrDeleted={menuToBeUpdatedOrDeleted}
      menuCategories={menuCategories}
      selectedMenuCategoryIds={selectedMenuCategoryIds}
      isCurrentNotAvailableMenu={isCurrentNotAvailableMenu}
    />
  );
}
