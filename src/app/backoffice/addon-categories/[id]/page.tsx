import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddonCategory, updatingAddonCategory } from "../action";
import { getMenusByCompanyId } from "@/libs/action";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingAddonCategories({ params }: Props) {
  const id = Number(params.id);

  const addonCategoryToBeUpdate = await prisma.addonCategories.findFirst({
    where: { id: id },
    include: { addonCategoriesAndMenus: true },
  });
  const selectedMenuIds = addonCategoryToBeUpdate?.addonCategoriesAndMenus.map(
    (item) => item.menuId
  );

  const menus = await getMenusByCompanyId();
  return (
    <Box
      sx={{
        paddingRight: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          component={"form"}
          action={updatingAddonCategory}
          sx={{
            width: "100%",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={addonCategoryToBeUpdate?.name}
              name="name"
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Menus{" "}
          </Typography>

          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              width: "100%",

              px: 1.5,
              py: 1,
              mb: 1,
              borderRadius: "5px",
            }}
          >
            {menus.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      selectedMenuIds?.includes(item.id) ? true : false
                    }
                    name="menuId"
                    value={item.id}
                  />
                }
                label={item.name}
                sx={{ color: "#023047" }}
              />
            ))}
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    addonCategoryToBeUpdate?.isRequired ? true : false
                  }
                  name="isRequired"
                />
              }
              label="Is Required"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" value={id} name="addonCategoryId" />

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "fit-content",
              bgcolor: "#023047",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              mt: "10px",
            }}
          >
            Update
          </Button>
        </Box>
        <Box component={"form"} action={deleteAddonCategory} sx={{ mt: 2 }}>
          <input type="hidden" value={id} name="addonCategoryId" />
          <Button type="submit" variant="contained" color="error">
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
