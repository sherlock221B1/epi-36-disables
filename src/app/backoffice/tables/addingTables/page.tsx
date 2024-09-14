import { Box, Button, TextField } from "@mui/material";
import { addingTable } from "../action";
import { getCurrentLocationId } from "@/libs/action";

export default async function AddingTables() {
  const currentLocationId = await getCurrentLocationId();
  return (
    <Box
      component={"form"}
      action={addingTable}
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
        <input type="hidden" name="locationId" value={currentLocationId} />
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
          Add Table
        </Button>
      </Box>
    </Box>
  );
}
