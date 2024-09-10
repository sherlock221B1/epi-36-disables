import SideBar from "@/components/sideBar";
import TopBar from "@/components/topBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function BackOfficeLayout({ children }: Props) {
  return (
    <Box>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            paddingRight: "0px",
            bgcolor: "#219ebc ",
          }}
        >
          {" "}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
