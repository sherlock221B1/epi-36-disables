import { Box } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {
  const session = await getServerSession();
  console.log("session is", session);
  return (
    <Box>
      <h1>Orders Page : {session?.user?.email}</h1>
    </Box>
  );
}
