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
import { deleteAddon, updatingAddon } from "../action";
import { getAddonCategoriesByCompanyId } from "@/libs/action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingAddon({ params }: Props) {
  const id = Number(params.id);

  const addonCategories = await getAddonCategoriesByCompanyId();

  const addonToBeUpdatedOrDeleted = await prisma.addons.findFirst({
    where: { id: id },
  });

  if (!addonToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={deleteAddon}
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
        <h2>Updating Addon</h2>
        <input type="hidden" name="addonId" value={id} />
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
        action={updatingAddon}
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
              placeholder="Name"
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "100%" }}
              defaultValue={addonToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              my: "20px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <TextField
              name="price"
              placeholder="Price"
              id="outlined-basic"
              variant="outlined"
              type="number"
              sx={{ width: "100%" }}
              defaultValue={
                addonToBeUpdatedOrDeleted.price === 0
                  ? ""
                  : addonToBeUpdatedOrDeleted.price
              }
            />
          </Box>
          <Typography variant="h6"> Addon Cateogries</Typography>
          <Box
            sx={{
              display: "flex",
              bgcolor: "white",
              px: 1.5,
              py: 1,
              borderRadius: "5px",
            }}
          >
            {addonCategories.map((item) => (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    defaultChecked={
                      item.id === addonToBeUpdatedOrDeleted.addonCategoryId
                        ? true
                        : false
                    }
                    name="addonCategoryId"
                    value={item.id}
                  />
                }
                label={item.name}
                sx={{ color: "#023047" }}
              />
            ))}
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    addonToBeUpdatedOrDeleted.isAvailable ? true : false
                  }
                  name="isAvailable"
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>
          <input type="hidden" name="addonId" value={id} />
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
            Update Addon
          </Button>
        </Box>
      </Box>
    </>
  );
}
