import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Menus, MenusCategories } from "@prisma/client";
import { addingMenuCategory } from "../action";
import { getCompanyId } from "@/libs/action";

export default async function addingMenuCategories() {
  const companyId = await getCompanyId();
  return (
    <Box
      component={"form"}
      action={addingMenuCategory}
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
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            defaultValue={""}
            name="addedMenuCategoryName"
          />
        </Box>
        <input type="hidden" name="companyId" value={companyId} />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#023047",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            mt: "10px",
          }}
          /*           onClick={handleAddingMenuCategory}
           */
        >
          Add Menu Category
        </Button>
      </Box>
    </Box>
  );
}
