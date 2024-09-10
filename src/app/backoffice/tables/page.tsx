import { Box, Button } from "@mui/material";
import Link from "next/link";
import { getTablesByLocationId } from "@/libs/action";
import TableBarIcon from "@mui/icons-material/TableBar";
import ItemCard from "@/components/ItemCard";

export default async function TablesPage() {
  const tables = await getTablesByLocationId();

  if (!tables) {
    return (
      <Box>
        <h1>hello</h1>
      </Box>
    );
  }

  if (tables.length === 0) {
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
          <Link href={"/backoffice/tables/addingTables"}>
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
            There is no table yet
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
        <Link href={"/backoffice/tables/addingTables"}>
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
        {tables.map((table) => {
          return (
            <ItemCard
              key={table.id}
              href={`/backoffice/tables/${table.id}`}
              name={table.name}
              icon={<TableBarIcon fontSize="large" />}
            />
          );
        })}
      </Box>
    </>
  );
}
