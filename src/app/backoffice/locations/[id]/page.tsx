import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { deleteLocation, updatingLocation } from "../action";
import { getCurrentLocationId, getLocationsByCompanyId } from "@/libs/action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingLocation({ params }: Props) {
  const id = Number(params.id);
  const currentLocationId = await getCurrentLocationId();
  const locationToBeUpdatedOrDeleted = await prisma.locations.findFirst({
    where: { id },
  });

  if (!locationToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={deleteLocation}
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
        <h2>Updating Location</h2>
        <input type="hidden" name="locationId" value={id} />
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
        action={updatingLocation}
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
              defaultValue={locationToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={id === currentLocationId}
                  name="locationIsSelected"
                />
              }
              label="CurrentLocation"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" name="locationId" value={id} />
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
            Update Location
          </Button>
        </Box>
      </Box>
    </>
  );
}
