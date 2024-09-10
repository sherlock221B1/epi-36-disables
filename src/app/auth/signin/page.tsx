"use client";

import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function signInPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: "#219ebc",
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "430px",
          height: "auto",
          textAlign: "center",
          color: "#023047",
        }}
      >
        <Typography variant="h2">Welcome Back!</Typography>
        <span style={{ textAlign: "center" }}>
          Sign in to your page to access your backoffice and manange your menus
        </span>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#023047",
          color: "#8ecae6",
          mt: 3,
          ":hover": { bgcolor: "#8ecae6", color: "#023047" },
        }}
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
      >
        Sign In With Google
      </Button>
    </Box>
  );
}
