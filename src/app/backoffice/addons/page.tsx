import { Box, Button } from "@mui/material";
import Link from "next/link";
import { Addons, Menus } from "@prisma/client";
import MenuCard from "@/components/MenuCard";
import { prisma } from "@/libs/prisma";
import AddonCard from "@/components/AddonCard";
import { getAddonsByCompanyId } from "@/libs/action";

export default async function AddonsPage() {
  const addons: Addons[] = await getAddonsByCompanyId();

  if (!addons) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (addons.length === 0) {
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
          <Link href={"/backoffice/addons/addingAddons"}>
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
            There is no addon yet
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
        <Link href={"/backoffice/addons/addingAddons"}>
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
        {addons.map((addon) => {
          return <AddonCard key={addon.id} addon={addon} />;
        })}
      </Box>
    </>
  );
}
