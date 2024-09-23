"use client";

import { addingMenu } from "@/app/backoffice/menus/action";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
<<<<<<< HEAD
  Typography,
} from "@mui/material";
import { AddonCategories, MenusCategories } from "@prisma/client";
=======
} from "@mui/material";
import { MenusCategories } from "@prisma/client";
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  menuCategories: MenusCategories[];
<<<<<<< HEAD
  addonCategories: AddonCategories[];
}
export default function AddingMenuPage({
  menuCategories,
  addonCategories,
}: Props) {
=======
}
export default function AddingMenuPage({ menuCategories }: Props) {
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Box
      component={"form"}
      action={async (formData: FormData) => {
        setLoading(true);

        const file = formData.get("file") as File;
        if (file.size) {
          const { url } = await upload(
            `foodie-pos/menus/${new Date().getTime()}-${file.name}`,
            file,
            {
              access: "public",
              handleUploadUrl: "/api/upload",
            }
          );
          formData.set("imageUrl", url);
        }

        const response = await addingMenu(formData);
<<<<<<< HEAD
        if (response.errors) {
          response.errors.map((error) => {
            toast.error(error.message);
          });

=======
        if (response.error) {
          toast.error(response.error);
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
          setLoading(false);
        } else {
          setLoading(false);
          toast.success("Menu is created successfully");
          router.push("/backoffice/menus");
        }
      }}
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
<<<<<<< HEAD
        <h1 style={{ marginBottom: "20px" }}>Adding Menu</h1>

=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
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
            id="outlined-basic"
            variant="outlined"
            placeholder="Price"
            type="number"
            sx={{ width: "100%" }}
          />
        </Box>
<<<<<<< HEAD
        <Typography>Menu Categories</Typography>
=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
        <Box
          sx={{
            display: "flex",
            bgcolor: "white",
            px: 1.5,
            py: 1,
<<<<<<< HEAD
            mb: 2,
=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
            borderRadius: "5px",
          }}
        >
          {menuCategories.map((item) => (
            <FormControlLabel
              key={item.id}
              control={<Checkbox name="menuCategoryId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>
<<<<<<< HEAD

        <Typography>Addon Categories</Typography>
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
              control={<Checkbox name="addonCategoryId" value={item.id} />}
              label={item.name}
              sx={{ color: "#023047" }}
            />
          ))}
        </Box>

=======
>>>>>>> 0b97d4fbb38ad7597ced3eff4e5fd0abbb5ab044
        <TextField
          type="file"
          name="file"
          sx={{
            width: "100%",
            bgcolor: "white",
            mt: 2.5,
            mb: 1,
            borderRadius: "5px",
          }}
        />
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked name="isAvailable" />}
            label="Is Available"
            sx={{ color: "#023047" }}
          />
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
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
            Add Menu
          </Button>
        )}
      </Box>
    </Box>
  );
}
