import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import { Menus, MenusCategories } from "@prisma/client";
import CategoryIcon from "@mui/icons-material/Category";

interface Props {
  menuCategory: MenusCategories;
}

export default function MenuCategoryCard({ menuCategory }: Props) {
  const { name } = menuCategory;
  console.log("menuid is", menuCategory.id);
  return (
    <Link
      href={`/backoffice/menu-categories/${menuCategory.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mr: "8px",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#8ecae6",
            color: "#023047",
            width: "170px",
            height: "170px",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <CategoryIcon fontSize="large" />
          <h3
            style={{
              padding: "0",
              margin: "0",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {menuCategory.name}
          </h3>
        </Box>
      </Box>
    </Link>
  );
}
