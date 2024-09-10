import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import { Menus } from "@prisma/client";

interface Props {
  menu: Menus;
  isAvailable: boolean;
}

export default function MenuCard({ menu, isAvailable }: Props) {
  const { name, price } = menu;
  return (
    <Link
      href={`/backoffice/menus/${menu.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: 200,
          height: 200,
          borderRadius: 2,
          boxShadow: 3,
          mr: 2,
          mb: 5,
          bgcolor: "#8ecae6",
        }}
      >
        <img
          src="https://images.squarespace-cdn.com/content/v1/5a81c36ea803bb1dd7807778/1610403788186-K2ATWJRYLHVC4ENCZZ7D/Shan+khaut+swe+%28Shan+sticky+noodles%29"
          alt="Menu Item"
          width="100%"
          height="50%"
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize="15px" fontWeight="bold">
              {name}
            </Typography>
            <Typography fontSize="15px" color="primary">
              ${price}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              label={isAvailable ? "Available" : "Sold out"}
              color={isAvailable ? "success" : "error"}
              sx={{ fontSize: "0.75rem", padding: "2px 8px" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
