import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import {
  AddonCategories,
  Menus,
  MenusCategories,
  Tables,
} from "@prisma/client";
import TableBarIcon from "@mui/icons-material/TableBar";

interface Props {
  table: Tables;
}

export default function TableCard({ table }: Props) {
  const { name } = table;
  return (
    <Link
      href={`/backoffice/tables/${table.id}`}
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
          <TableBarIcon fontSize="large" />
          <h3
            style={{
              padding: "0",
              margin: "0",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {table.name}
          </h3>
        </Box>
      </Box>
    </Link>
  );
}
