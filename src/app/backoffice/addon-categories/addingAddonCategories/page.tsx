import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { addingAddonCategory } from "../action";
import { getMenusByCompanyId } from "@/libs/action";

export default async function addinAddonCategory() {
  const menus = await getMenusByCompanyId();
  return (
    <Box
      component={"form"}
      action={addingAddonCategory}
      sx={{
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
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            defaultValue={""}
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
            px: 1.5,
            py: 1,
            mb: 1,
            borderRadius: "5px",
          }}
        >
          {menus.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="menuId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox name="isRequired" />}
            label="Is Required"
            sx={{ color: "#023047" }}
          />
        </Box>

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
          Add Addon Category
        </Button>
      </Box>
    </Box>
  );
}
