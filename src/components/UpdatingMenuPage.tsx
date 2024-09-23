"use client";

import { deleteMenu, updatingMenu } from "@/app/backoffice/menus/action";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
<<<<<<< HEAD
  Typography,
} from "@mui/material";
import {
  AddonCategories,
=======
} from "@mui/material";
import {
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
  DisableMenusAndLocations,
  Menus,
  MenusCategories,
} from "@prisma/client";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  menuId: number;
  menuToBeUpdatedOrDeleted: Menus;
  menuCategories: MenusCategories[];
<<<<<<< HEAD
  addonCategories: AddonCategories[];
  selectedMenuCategoryIds: number[] | undefined;
  selectedAddonCategoryIds: number[] | undefined;
=======
  selectedMenuCategoryIds: number[] | undefined;
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
  isCurrentNotAvailableMenu: DisableMenusAndLocations | undefined;
}

export default function UpdatingMenuPage({
  menuId,
  menuToBeUpdatedOrDeleted,
  menuCategories,
  selectedMenuCategoryIds,
<<<<<<< HEAD
  addonCategories,
  selectedAddonCategoryIds,
=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
  isCurrentNotAvailableMenu,
}: Props) {
  const router = useRouter();

  const imageUrl = menuToBeUpdatedOrDeleted.imageUrl
    ? menuToBeUpdatedOrDeleted.imageUrl
    : `data:image/jpeg;base64,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`;

  const handleUpdateMenu = async (formData: FormData) => {
    const file = formData.get("file") as File;
    if (file.size) {
      const { url } = await upload(
        `foodie-pos/menus/${new Date().getTime()}-${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload",
        }
      );

      formData.set("imageUrl", url);
    }
    const response = await updatingMenu(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Menu is created successfully");
      router.push("/backoffice/menus");
    }
  };

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={deleteMenu}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2.5,
          paddingRight: 3,
        }}
      >
        {" "}
        <h2>Updating Menu</h2>
        <input type="hidden" name="menuId" value={menuId} />
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: "7px" }}
        >
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={handleUpdateMenu}
        sx={{
          paddingRight: 3,
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
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              name="name"
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={menuToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              my: "20px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <TextField
              name="price"
              id="outlined-basic"
              variant="outlined"
              placeholder="Price"
              type="number"
              sx={{ width: "100%" }}
              defaultValue={
                menuToBeUpdatedOrDeleted.price === 0
                  ? ""
                  : menuToBeUpdatedOrDeleted.price
              }
            />
          </Box>
<<<<<<< HEAD
          <Typography>MenuCategories</Typography>
=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              px: 1.5,
              py: 1,
<<<<<<< HEAD
              mb: 2,
=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
              borderRadius: "5px",
            }}
          >
            {menuCategories.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      selectedMenuCategoryIds?.includes(item.id) ? true : false
                    }
                    name="menuCategoryId"
                    value={item.id}
                  />
                }
                label={item.name}
                sx={{ color: "#023047" }}
              />
            ))}
          </Box>
<<<<<<< HEAD

          <Typography>AddonCategories</Typography>
          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              px: 1.5,
              py: 1,
              borderRadius: "5px",
            }}
          >
            {addonCategories.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      selectedAddonCategoryIds?.includes(item.id) ? true : false
                    }
                    name="addonCategoryId"
                    value={item.id}
                  />
                }
                label={item.name}
                sx={{ color: "#023047" }}
              />
            ))}
          </Box>

=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
          <img
            src={imageUrl}
            style={{
              marginTop: "20px",
              borderRadius: "5px",
              maxWidth: "200px",
            }}
          />
          <TextField
            type="file"
            name="file"
            sx={{
              width: "100%",
              bgcolor: "white",
              mt: 2.5,
              mb: 1,
              borderRadius: "5px",
            }}
          />

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={isCurrentNotAvailableMenu ? false : true}
                  name="isAvailable"
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>
          <input type="hidden" name="menuId" value={menuId} />
          <input
            type="hidden"
            name="isCurrentNotAvailableMenu"
            value={isCurrentNotAvailableMenu?.id}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#219ebc", color: "#023047" },
              mt: "10px",
            }}
          >
            Update Menu
          </Button>
        </Box>
      </Box>
    </>
  );
}
