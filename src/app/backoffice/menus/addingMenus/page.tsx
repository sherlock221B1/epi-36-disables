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
<<<<<<< HEAD
import {
  getAddonCategoriesByCompanyId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
=======
import { getMenuCategoriesByCompanyId } from "@/libs/action";
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
import AddingMenuPage from "@/components/AddingMenuPage";

export default async function AddingMenus() {
  const menuCategories = await getMenuCategoriesByCompanyId();
  const addonCategories = await getAddonCategoriesByCompanyId();

<<<<<<< HEAD
  return (
    <AddingMenuPage
      menuCategories={menuCategories}
      addonCategories={addonCategories}
    />
  );
=======
  return <AddingMenuPage menuCategories={menuCategories} />;
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
}
