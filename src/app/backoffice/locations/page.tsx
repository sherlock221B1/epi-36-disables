import { Box, Button } from "@mui/material";
import Link from "next/link";
import { Locations, Tables } from "@prisma/client";
import { getLocationsByCompanyId, getTablesByLocationId } from "@/libs/action";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ItemCard from "@/components/ItemCard";

export default async function LocationsPage() {
  const locations: Locations[] = await getLocationsByCompanyId();
  if (!locations) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (locations.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            paddingTop: "0px",
          }}
        >
          <Link href={"/backoffice/location/addingLocations"}>
            <Button
              sx={{
                bgcolor: "#023047",
                color: "#8ecae6",
                ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              }}
              variant="contained"
            >
              Create New
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            mt: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#8ecae6",
              color: "#023047",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no location yet
          </h1>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <Link href={"/backoffice/locations/addingLocations"}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
          >
            Create New
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mt: "20px",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {locations.map((location) => {
          return (
            <ItemCard
              key={location.id}
              href={`/backoffice/locations/${location.id}`}
              name={location.name}
              icon={<LocationOnIcon fontSize="large" />}
            />
          );
        })}
      </Box>
    </>
  );
}
