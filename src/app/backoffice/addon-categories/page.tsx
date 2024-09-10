import ItemCard from "@/components/ItemCard";
import { getAddonCategoriesByCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { Box, Button, Link } from "@mui/material";
import { AddonCategories } from "@prisma/client";
import ClassIcon from "@mui/icons-material/Class";

export default async function AddonCategoriesPage() {
  const addonCategories: AddonCategories[] =
    await getAddonCategoriesByCompanyId();

  if (addonCategories.length === 0) {
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
          <Link href="/backoffice/addon-categories/addingAddonCategories">
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
            There is no AddonCategory yet
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
        <Link href={"/backoffice/addon-categories/addingAddonCategories"}>
          <Button
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
            variant="contained"
          >
            Create New AddonCategory
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
        {addonCategories.map((addonCategory) => {
          return (
            <ItemCard
              key={addonCategory.id}
              href={`/backoffice/addon-categories/${addonCategory.id}`}
              name={addonCategory.name}
              icon={<ClassIcon fontSize="large" />}
            />
          );
        })}
      </Box>
    </>
  );
}
