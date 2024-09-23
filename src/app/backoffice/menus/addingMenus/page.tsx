import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { addingMenu } from "../action";
import {
  getAddonCategoriesByCompanyId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import AddingMenuPage from "@/components/AddingMenuPage";

export default async function AddingMenus() {
  const menuCategories = await getMenuCategoriesByCompanyId();
  const addonCategories = await getAddonCategoriesByCompanyId();

  return (
    <AddingMenuPage
      menuCategories={menuCategories}
      addonCategories={addonCategories}
    />
  );
}
