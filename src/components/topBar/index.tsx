import { Box } from "@mui/material";
import { prisma } from "@/libs/prisma";
import {
  getCurrentLocation,
  getCurrentLocationId,
  getLocationsByCompanyId,
} from "@/libs/action";
import LogOut from "../LogOut";

export default async function TopBar() {
  const currentLocation = await getCurrentLocation();

  return (
    <Box
      sx={{
        bgcolor: "#021e2c",
        color: "#8ecae6",
        height: "13vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "17px",
        fontSize: "20px",
      }}
    >
      <h3>Foodie POS</h3>
      <h3>{currentLocation?.name}</h3>

      <LogOut />
    </Box>
  );
}
