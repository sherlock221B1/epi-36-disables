import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function OrderAppLayout({ children }: Props) {
  return <Box sx={{ bgcolor: "#f1faee", minHeight: "100vh" }}>{children}</Box>;
}
