import ItemCard from "@/components/ItemCard";
import {
  getCurrentLocationId,
  getMenuCategoriesByCompanyId,
} from "@/libs/action";
import { Box, Button, Link } from "@mui/material";
import { MenusCategories } from "@prisma/client";
import CategoryIcon from "@mui/icons-material/Category";
import { green, red } from "@mui/material/colors";

export default async function MenusCategoriesPage() {
  const menuCategories = await getMenuCategoriesByCompanyId();

  const currentLocationId = await getCurrentLocationId();

  if (menuCategories.length === 0) {
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
          <Link href="/backoffice/menu-categories/addingMenuCategories">
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
            There is no menu category yet
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
        <Link href={"/backoffice/menu-categories/addingMenuCategories"}>
          <Button
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
            variant="contained"
          >
            Create New Menu Category
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
        {menuCategories.map((menuCategory) => {
          const menuCategoryIsNotAvailable =
            menuCategory.disableMenuCategoriesAndLocations.find(
              (item) =>
                item.menuCategoryId === menuCategory.id &&
                item.locationId === currentLocationId
            );

          return (
            <Box
              key={menuCategory.id}
              sx={
                menuCategoryIsNotAvailable
                  ? { opacity: "0.4" }
                  : { opacity: "1" }
              }
            >
              <ItemCard
                href={`/backoffice/menu-categories/${menuCategory.id}`}
                name={menuCategory.name}
                icon={<CategoryIcon fontSize="large" />}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
