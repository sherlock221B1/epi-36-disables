import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { addingLocation } from "../action";
import { getLocationsByCompanyId } from "@/libs/action";

export default async function AddingLocations() {
  return (
    <Box
      component={"form"}
      action={addingLocation}
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
          />
        </Box>

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
          Add Location
        </Button>
      </Box>
    </Box>
  );
}
