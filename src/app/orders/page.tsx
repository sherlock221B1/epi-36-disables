import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",

        height: "100vh",
        bgcolor: "#00b4d8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        {" "}
        <h1
          style={{
            backgroundColor: "#0077b6",
            color: "#03045e",
            padding: "10px",
            borderRadius: "7px",
          }}
        >
          Orders Page
        </h1>
      </Box>
      <Box sx={{ mt: 3 }}>
        {" "}
        <Link href={"/backoffice"}>
          <Button
            variant="contained"
            sx={{
              mr: 3,
              backgroundColor: "#0077b6",
              color: "#90e0ef",
              padding: "10px",
              borderRadius: "7px",
              ":hover": { bgcolor: "#90e0ef", color: "#03045e" },
            }}
          >
            Backoffice
          </Button>
        </Link>
        <Link href={"/"}>
          {" "}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0077b6",
              color: "#90e0ef",
              padding: "10px",
              borderRadius: "7px",
              ":hover": { bgcolor: "#90e0ef", color: "#03045e" },
            }}
          >
            Landing Page
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
