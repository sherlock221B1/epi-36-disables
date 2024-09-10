import { prisma } from "@/libs/prisma";
import { Box, Button, TextField } from "@mui/material";
import { deleteMenuCategory, updatingMenuCategory } from "../action";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingMenuCategories({ params }: Props) {
  const id = Number(params.id);

  const menuCategoryToBeUpdate = await prisma.menusCategories.findFirst({
    where: { id: id },
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#8ecae6",
          width: "300px",
          height: "300px",
          borderRadius: "10px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"form"}
          action={updatingMenuCategory}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={menuCategoryToBeUpdate?.name}
              name="updatedMenuCategoryName"
            />
          </Box>
          <input type="hidden" value={id} name="menuCategoryId" />

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#023047",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              mt: "10px",
            }}
          >
            Update
          </Button>
        </Box>
        <Box component={"form"} action={deleteMenuCategory} sx={{ mt: 2 }}>
          <input type="hidden" value={id} name="menuCategoryId" />
          <Button type="submit" variant="contained" color="error">
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
