import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { getLocationsByCompanyId } from "@/libs/action";
import { deleteTable, updatingTable } from "../action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingTable({ params }: Props) {
  const id = Number(params.id);

  const tableToBeUpdatedOrDeleted = await prisma.tables.findFirst({
    where: { id },
  });

  if (!tableToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <>
      {" "}
      <Box
        component={"form"}
        action={deleteTable}
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
        <h2>Updating Table</h2>
        <input type="hidden" name="tableId" value={id} />
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
        action={updatingTable}
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
              defaultValue={tableToBeUpdatedOrDeleted.name}
            />
          </Box>
          <input type="hidden" name="tableId" value={id} />
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
            Update Table
          </Button>
        </Box>
      </Box>
    </>
  );
}
